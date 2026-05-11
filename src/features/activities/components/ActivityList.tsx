import React from 'react';

export const ActivityList: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-50 active:bg-slate-50 transition-colors">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-xl">
            {i % 2 === 0 ? '💰' : '📅'}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-800 text-sm m-0">
              {i % 2 === 0 ? `Thanh toán dịch vụ #${i}82` : `Đặt lịch thành công #${i}91`}
            </h4>
            <p className="text-[11px] text-slate-400 m-0 mt-0.5">{i * 2} giờ trước</p>
          </div>
          <span className={`font-bold text-sm ${i % 2 === 0 ? 'text-green-600' : 'text-indigo-600'}`}>
            {i % 2 === 0 ? '+500k' : 'Pending'}
          </span>
        </div>
      ))}
    </div>
  );
};
