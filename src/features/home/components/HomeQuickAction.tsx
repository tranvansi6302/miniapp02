import React from 'react';
import { Text, Button } from 'ejsc-ma-component';
import quickBookingIcon from '../../../assets/icons/quick-booking.png';

export const HomeQuickAction: React.FC = () => {
  return (
    <div className="rounded-full bg-origin-border bg-linear-to-r from-[#fbf8f6] to-[#FEF3EB] border border-ejsc-brand/10 flex items-center justify-between px-3.5 py-1.5 select-none gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-12 h-12 shrink-0 rounded-full bg-white/60 flex items-center justify-center">
          <img src={quickBookingIcon} alt="Quick Booking" />
        </div>
        <div className="flex flex-col min-w-0">
          <Text variant="sub" weight="semibold" className="text-slate-800">Bạn cần dịch vụ ngay</Text>
          <Text variant="caption" className="text-slate-500">Không cần đăng nhập</Text>
        </div>
      </div>
      <Button theme="brand" size="sm" className='rounded-full'>
        Đặt ngay
      </Button>
    </div>
  );
};
