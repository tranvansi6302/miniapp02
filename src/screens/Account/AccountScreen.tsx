/**
 * @file screens/Home/AccountScreen.tsx
 * @description Tài khoản - Lấy thông tin từ Native Bridge getUserInfo.
 * App: Mini App 02
 */
import React, { useEffect, useState } from 'react';
import { Button, Text, StandardPage, Card } from 'ejsc-ma-component';
import { apisAsync } from 'ejsc-ma-api';
import { User, Mail, ExternalLink, RefreshCw } from 'lucide-react';

const AccountScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await apisAsync.getUserInfo();
      if (res.success && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUser(); }, []);

  const displayName = user?.fullName || user?.FullName || user?.FirstName || user?.name || '';
  const displayEmail = user?.email || user?.Email || '';

  if (loading) {
    return (
      <StandardPage hideAppBar contentClassName="!p-0">
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <Text variant="sub" className="text-slate-400">Đang tải thông tin...</Text>
          </div>
        </div>
      </StandardPage>
    );
  }

  if (!user) {
    return (
      <StandardPage hideAppBar contentClassName="!p-0">
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-slate-50">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg border border-slate-100">
            <User size={40} className="text-slate-300" />
          </div>
          <Text variant="h2" weight="bold" className="mb-2 text-slate-800">Chưa đăng nhập</Text>
          <Text variant="sub" className="text-slate-500 mb-8 text-center">
            Thông tin tài khoản được lấy từ Super App qua Bridge.
          </Text>
          <Button
            theme="brand"
            block
            className="h-14 rounded-2xl font-bold bg-blue-600 border-none"
            onClick={fetchUser}
            startIcon={<RefreshCw size={18} />}
          >
            Thử lại
          </Button>
        </div>
      </StandardPage>
    );
  }

  return (
    <StandardPage hideAppBar contentClassName="!p-0">
      {/* Header - blue theme cho Mini App 02 */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 px-6 pt-24 pb-10 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center mb-4">
          <User size={42} className="text-white" />
        </div>
        <Text variant="h2" weight="bold" color="white" className="block mb-1 text-center">
          {displayName || 'Người dùng'}
        </Text>
        {displayEmail && (
          <div className="flex items-center gap-1.5">
            <Mail size={14} className="text-white/60" />
            <Text variant="sub" color="white" className="opacity-70">{displayEmail}</Text>
          </div>
        )}
      </div>

      <div className="px-4 -mt-4 pb-10 flex flex-col gap-4">
        {/* Info Card */}
        <Card className="rounded-3xl border-none shadow-xl bg-white p-5">
          <Text variant="base" weight="bold" className="text-slate-700 mb-4 block">Thông tin tài khoản</Text>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
              <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
                <User size={16} className="text-blue-600" />
              </div>
              <div>
                <Text variant="tiny" className="text-slate-400 block">Họ và tên</Text>
                <Text variant="base" weight="bold" className="text-slate-800">{displayName || '—'}</Text>
              </div>
            </div>
            {displayEmail && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
                <div className="w-9 h-9 rounded-xl bg-cyan-100 flex items-center justify-center">
                  <Mail size={16} className="text-cyan-600" />
                </div>
                <div>
                  <Text variant="tiny" className="text-slate-400 block">Email</Text>
                  <Text variant="base" weight="bold" className="text-slate-800">{displayEmail}</Text>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Link */}
        <Card className="rounded-2xl border border-slate-100 bg-white p-4">
          <Text variant="base" weight="bold" className="text-slate-700 mb-3 block">Liên kết nhanh</Text>
          <button
            className="w-full flex items-center gap-3 p-3 bg-orange-50 rounded-2xl border border-orange-100 active:scale-[0.98] transition-transform"
            onClick={() => (window as any).ejsc?.openDeeplink({ url: 'ejsc://mini-apps/mini-app-3', title: 'Mini App 03' })}
          >
            <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold text-sm">3</div>
            <Text variant="base" weight="bold" className="flex-1 text-left text-orange-800">Mở Mini App 03</Text>
            <ExternalLink size={15} className="text-orange-500" />
          </button>
        </Card>
      </div>
    </StandardPage>
  );
};

export default AccountScreen;
