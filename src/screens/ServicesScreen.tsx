import React, { useState } from 'react';
import { Card, Button, Text } from 'ejsc-ma-component';
import { apisAsync } from 'ejsc-ma-api';

const ServicesScreen: React.FC = () => {
  const [storageInfo, setStorageInfo] = useState<any>(null);

  const checkStorage = async () => {
    try {
      const accessToken = await apisAsync.getStorage({ key: 'accessToken' });
      const refreshToken = await apisAsync.getStorage({ key: 'refreshToken' });
      const userProfile = await apisAsync.getStorage({ key: 'userProfile' });

      setStorageInfo({
        accessToken: accessToken.data,
        refreshToken: refreshToken.data,
        userProfile: userProfile.data
      });
    } catch (err) {
      console.error('Error checking storage:', err);
    }
  };

  return (
    <div className="page-content p-4">
      <Card title="Debug Storage (Native)" className="mb-4">
        <Button onClick={checkStorage} theme="neutral" size="sm" className="mb-2">
          Check Auth Storage
        </Button>
        {storageInfo && (
          <div className="bg-gray-100 p-2 rounded text-[10px] font-mono break-all max-h-40 overflow-auto">
            <pre>{JSON.stringify(storageInfo, null, 2)}</pre>
          </div>
        )}
      </Card>

      <Card title="Dịch vụ" className="mb-4">
        <p className="text-gray-600">Danh sách các dịch vụ đang được cung cấp.</p>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-4 flex flex-col items-center justify-center aspect-square">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-blue-600 font-bold">{i}</span>
            </div>
            <span className="text-sm font-medium">Dịch vụ {i}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesScreen;
