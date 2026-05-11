import React from 'react';
import { StandardPage } from 'ejsc-ma-component';
import { ServiceList, ServicesBanner } from '~/features/services';

const ServicesScreen: React.FC = () => {
  return (
    <StandardPage title="Dịch vụ">
      <div className="p-4">
        <ServicesBanner />
        <ServiceList />
      </div>
    </StandardPage>
  );
};

export default ServicesScreen;
