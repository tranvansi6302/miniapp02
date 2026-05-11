import React from 'react';

export const ActivitiesHeader: React.FC = () => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-slate-800 m-0">Giao dịch gần đây</h3>
      <p className="text-slate-400 text-xs m-0 mt-1">Lịch sử hoạt động trong 30 ngày qua.</p>
    </div>
  );
};
