import React from 'react';
import { Card, Text } from 'ejsc-ma-component';

interface AccountMenuProps {
  onNavigate: (path: string) => void;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({ onNavigate }) => {
  const menuItems = [
    { label: 'Thông tin cá nhân', icon: '👤' },
    { label: 'Lịch sử giao dịch', icon: '📜' },
    { label: 'Cài đặt thông báo', icon: '🔔' },
    { label: 'Hỗ trợ', icon: '🎧' },
    { label: 'Thông tin ứng dụng', icon: 'ℹ️', onClick: () => onNavigate('/about') }
  ];

  return (
    <Card className="mb-6 rounded-2xl border-none shadow-sm">
      <div className="flex flex-col">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={item.onClick}
            className={`py-5 flex justify-between items-center ${idx !== menuItems.length - 1 ? 'border-b border-gray-50' : ''} px-4 w-full text-left active:bg-gray-50 transition-colors`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium text-slate-700">{item.label}</span>
            </div>
            <span className="text-gray-300 text-xl">›</span>
          </button>
        ))}
      </div>
    </Card>
  );
};

export const AccountHeader: React.FC<{ user: any }> = ({ user }) => (
  <div className="flex flex-col items-center py-8 mb-4">
    <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white shadow-lg mb-4 flex items-center justify-center overflow-hidden">
      <img
        src={user.avatarUrl || user.Img || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id || user.Tel || 'user'}`}
        alt="avatar"
        className="w-full h-full object-cover"
      />
    </div>
    <h2 className="text-xl font-bold m-0 text-slate-800">
      {user.fullName || (user.FirstName ? `${user.FirstName} ${user.LastName || ''}` : 'Người dùng')}
    </h2>
    <p className="text-gray-500 text-sm mt-1">
      {user.email || user.Tel || 'Chưa cập nhật thông tin'}
    </p>
    <div className="mt-3 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
      Hội viên chính thức
    </div>
  </div>
);
