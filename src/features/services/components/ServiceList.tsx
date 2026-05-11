import React from 'react';
import { Card } from 'ejsc-ma-component';

export const ServiceList: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="p-4 flex flex-col items-center justify-center aspect-square border-none shadow-sm rounded-2xl active:scale-95 transition-transform">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-3">
            <span className="text-blue-600 text-xl font-bold">🛠️</span>
          </div>
          <span className="text-sm font-semibold text-slate-700">Dịch vụ {i}</span>
        </Card>
      ))}
    </div>
  );
};
