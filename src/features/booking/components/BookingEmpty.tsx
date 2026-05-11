import React from 'react';
import { Card, Button } from 'ejsc-ma-component';

export const BookingEmpty: React.FC = () => {
  return (
    <Card className="mb-6 border-none shadow-sm rounded-2xl overflow-hidden">
      <div className="bg-amber-500 p-6 text-white">
        <h3 className="text-xl font-bold m-0">Lên lịch hẹn</h3>
        <p className="text-amber-50 text-xs opacity-90 m-0 mt-1">Nhanh chóng và tiện lợi chỉ với vài bước.</p>
      </div>
      <div className="p-10 flex flex-col items-center justify-center bg-white">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-3xl mb-4">
          📅
        </div>
        <span className="text-slate-400 text-sm mb-6">Bạn chưa có lịch hẹn nào</span>
        <Button theme="brand" block className="rounded-full h-[4.6rem] font-bold shadow-lg shadow-ejsc-brand/20">
          Tạo lịch hẹn mới
        </Button>
      </div>
    </Card>
  );
};
