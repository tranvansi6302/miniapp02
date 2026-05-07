import React from 'react';
import { Card, Button } from 'ejsc-ma-component';

const BookingScreen: React.FC = () => {
  return (
    <div className="page-content p-4">
      <Card title="Đặt lịch" className="mb-4">
        <p className="text-gray-600">Chọn dịch vụ và thời gian bạn muốn đặt.</p>
      </Card>
      <Card className="p-6">
        <div className="flex flex-col gap-4">
          <div className="p-4 border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center py-10">
            <span className="text-gray-400 mb-2 italic">Chưa có lịch hẹn nào</span>
            <Button variant="brand" className="mt-2">Đặt lịch ngay</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookingScreen;
