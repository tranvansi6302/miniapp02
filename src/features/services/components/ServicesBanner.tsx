import React from 'react';
import { Card } from 'ejsc-ma-component';

export const ServicesBanner: React.FC = () => {
  return (
    <Card className="mb-6 bg-blue-600 text-white border-none rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-1">Dịch vụ chuyên nghiệp</h3>
      <p className="text-blue-100 text-sm opacity-90">Khám phá các giải pháp tối ưu cho ngôi nhà của bạn.</p>
    </Card>
  );
};
