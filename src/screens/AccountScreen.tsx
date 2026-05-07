import React from 'react';
import { Card, Button, Text, toast } from 'ejsc-ma-component';
import { useNavigate } from 'ejsc-ma-router';
import { apisAsync } from 'ejsc-ma-api';
import { useAuthStore } from '~/stores/auth.store';
import { authCommandApi } from '~/apis/auth/command/auth.command.api';

const JsonView = ({ data }: { data: any }) => {
  if (data === undefined || data === null) return null;

  const formatValue = (val: any) => {
    if (typeof val === 'string') return <span className="text-green-600">"{val}"</span>;
    if (typeof val === 'number') return <span className="text-blue-600">{val}</span>;
    if (typeof val === 'boolean') return <span className="text-purple-600">{val.toString()}</span>;
    return <span>{JSON.stringify(val)}</span>;
  };

  return (
    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100 font-mono text-[11px] overflow-x-auto">
      <div className="flex flex-col gap-1">
        {typeof data === 'object' ? (
          Object.entries(data).map(([key, val]) => (
            <div key={key} className="flex gap-2">
              <span className="text-red-500 shrink-0">"{key}":</span>
              <span className="break-all">{formatValue(val)}</span>
            </div>
          ))
        ) : (
          <div className="text-gray-700 break-all">{data.toString()}</div>
        )}
      </div>
    </div>
  );
};

const AccountScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout: logoutStore } = useAuthStore();

  const [debugData, setDebugData] = React.useState<any>(null);

  React.useEffect(() => {
    const loadDebug = async () => {
      const token = await apisAsync.getStorage({ key: 'accessToken' });
      const profile = await apisAsync.getStorage({ key: 'userProfile' });
      setDebugData({ accessToken: token.data, userProfile: profile.data });
    };
    loadDebug();
  }, [user]);

  const handleLogout = async () => {
    console.log('handleLogout clicked - Priority Clearing');
    try {
      // 1. Clear Native Storage TRƯỚC khi gọi API để đảm bảo hiệu lực ngay lập tức
      console.log('Clearing native storage...');
      try {
        await apisAsync.setStorage({ key: 'accessToken', data: null as any });
        await apisAsync.setStorage({ key: 'refreshToken', data: null as any });
        await apisAsync.setStorage({ key: 'userProfile', data: null as any });
        await apisAsync.removeStorage({ key: 'accessToken' });
        await apisAsync.removeStorage({ key: 'refreshToken' });
        await apisAsync.removeStorage({ key: 'userProfile' });
        await apisAsync.clearStorage();

        // Xóa cả web storage cho chắc chắn
        window.localStorage.clear();
        window.sessionStorage.clear();

        console.log('All storage cleared');

        // Xem các key còn lại trong native
        const info = await apisAsync.getStorageInfo();
        console.log('Remaining keys in native storage:', info.data?.keys);
      } catch (storageErr: any) {
        console.error('Error clearing storage:', storageErr);
      }

      // 2. Update Store & UI
      logoutStore();
      setDebugData(null);
      toast.success('Đã xóa bộ nhớ và đăng xuất');

      // 3. Gọi API logout (không quan trọng kết quả, đã clear máy khách xong)
      try {
        await authCommandApi.logout();
        console.log('Logout API called');
      } catch (apiErr) {
        console.warn('Logout API failed but storage was cleared', apiErr);
      }

      // 4. Navigate
      navigate('/login');
    } catch (err: any) {
      console.error('Critical logout error:', err);
      alert('Lỗi đăng xuất: ' + err.message);
    }
  };

  if (!user) {
    return (
      <div className="page-content p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-gray-300 text-4xl">👤</span>
        </div>
        <Text variant="h2" weight="bold" className="mb-2">Bạn chưa đăng nhập</Text>
        <Text variant="sub" className="text-gray-500 mb-8 text-center">Đăng nhập để quản lý tài khoản và nhận ưu đãi đặc biệt.</Text>
        <Button theme="brand" block className="h-[4.6rem] rounded-full font-bold" onClick={() => navigate('/login')}>
          Đăng nhập ngay
        </Button>
      </div>
    );
  }

  return (
    <div className="page-content p-4">
      <div className="flex flex-col items-center py-8 mb-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white shadow-lg mb-4 flex items-center justify-center overflow-hidden">
          <img
            src={user.Img || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.Tel}`}
            alt="avatar"
          />
        </div>
        <h2 className="text-xl font-bold m-0">{user.FirstName} {user.LastName}</h2>
        <p className="text-gray-500 text-sm">{user.Tel}</p>
        <div className="mt-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase">
          Hội viên hạng Vàng
        </div>
      </div>

      <Card className="mb-6 rounded-2xl border-none shadow-sm">
        <div className="flex flex-col">
          {[
            { label: 'Thông tin cá nhân', icon: '👤' },
            { label: 'Lịch sử giao dịch', icon: '📜' },
            { label: 'Cài đặt thông báo', icon: '🔔' },
            { label: 'Hỗ trợ', icon: '🎧' }
          ].map((item, idx) => (
            <div key={idx} className={`py-5 flex justify-between items-center ${idx !== 3 ? 'border-b border-gray-50' : ''} px-4`}>
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-slate-700">{item.label}</span>
              </div>
              <span className="text-gray-300 text-xl">›</span>
            </div>
          ))}
        </div>
      </Card>

      <Button
        theme="danger"
        block
        className="h-[4.6rem] rounded-full font-bold"
        onClick={handleLogout}
      >
        Đăng xuất 1
      </Button>

      {/* Debug Info Moved to Bottom */}
      <div className="mt-8 pt-8 border-t border-gray-100">
        <div className="flex items-center justify-between mb-1">
          <Text variant="sub" weight="bold" color="sub" className="uppercase text-[10px]">Debug Native Storage:</Text>
          <button
            onClick={async () => {
              const token = await apisAsync.getStorage({ key: 'accessToken' });
              const profile = await apisAsync.getStorage({ key: 'userProfile' });
              setDebugData({ accessToken: token.data, userProfile: profile.data });
              toast.success('Đã làm mới dữ liệu storage');
            }}
            className="text-[10px] text-ejsc-brand font-bold"
          >
            LÀM MỚI
          </button>
        </div>
        <JsonView data={debugData} />
      </div>
    </div>
  );
};

export default AccountScreen;
