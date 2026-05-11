import React from 'react';
import { StandardPage } from 'ejsc-ma-component';
import { ActivityList, ActivitiesHeader } from '~/features/activities';

const ActivitiesScreen: React.FC = () => {
  return (
    <StandardPage title="Hoạt động">
      <div className="p-4">
        <ActivitiesHeader />
        <ActivityList />
      </div>
    </StandardPage>
  );
};

export default ActivitiesScreen;
