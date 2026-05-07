import React from 'react';
import { Card } from 'ejsc-ma-component';

const ActivitiesScreen: React.FC = () => {
  return (
    <div className="page-content p-4">
      <Card title="Hoạt động" className="mb-4">
        <p className="text-gray-600">Theo dõi các hoạt động gần đây của bạn.</p>
      </Card>
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm m-0">Hoàn thành thanh toán #{i}234</h4>
              <p className="text-xs text-gray-500 m-0">2 giờ trước</p>
            </div>
            <span className="text-green-600 font-bold text-sm">+500k</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesScreen;
