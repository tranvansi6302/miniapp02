import React from 'react';
import { Users, Crown, ShieldCheck } from 'lucide-react';
import { Text } from 'ejsc-ma-component';
import { cn } from '~/utils/cn';

export const HomeQuickStats: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Cộng đồng', sub: 'Kết nối & chia sẻ', color: 'text-ejsc-brand-sub' },
    { icon: Crown, label: 'Hội viên', sub: 'Quyền lợi đặc biệt', color: 'text-ejsc-brand' },
    { icon: ShieldCheck, label: 'Chuyên gia', sub: 'Tư vấn chuyên sâu', color: 'text-ejsc-success' }
  ];

  return (
    <div
      className="bg-white rounded-ejsc select-none -mt-12 z-30 relative mx-0.5 border border-slate-50"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.03) 0px 1px 1px 0px' }}
    >
      <div className="grid grid-cols-3 divide-x divide-slate-100 py-3.5">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center px-1 active:opacity-70 transition-opacity cursor-pointer group"
          >
            <div className="flex flex-row items-center gap-1.5 mb-1">
              <item.icon size={16} className={cn("shrink-0", item.color)} />
              <Text variant="sub" weight="bold" className="text-slate-800 leading-none">
                {item.label}
              </Text>
            </div>
            <Text variant="caption" className="text-slate-400 font-normal">
              {item.sub}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};
