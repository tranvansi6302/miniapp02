/**
 * @file screens/Home/DeepLinkHomeScreen.tsx
 * @description Trang chủ tập trung vào DeepLink Navigation - Mini App 02.
 */
import React, { useState, useEffect } from 'react';
import { StandardPage, Text, Card, toast } from 'ejsc-ma-component';
import { ExternalLink, CheckCircle2, XCircle, User } from 'lucide-react';
import { apisAsync } from 'ejsc-ma-api';

const DeepLinkHomeScreen: React.FC = () => {
  const [lastResult, setLastResult] = useState<{ success: boolean; label: string } | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apisAsync.getUserInfo();
        if (res.success && res.data) {
          setUserInfo(res.data);
        }
      } catch (e) {
        console.error('Failed to fetch user info:', e);
      }
    };
    fetchUser();
  }, []);

  const displayName = userInfo?.fullName || userInfo?.FullName || userInfo?.FirstName || userInfo?.name || 'Người dùng';
  const displayEmail = userInfo?.email || userInfo?.Email || '';

  const openApp = async (appId: string, appName: string) => {
    try {
      const result = await (window as any).ejsc?.openDeeplink({
        url: `ejsc://mini-apps/${appId}`,
        title: appName,
      });
      if (result && result.success === false) {
        toast.error(`Lỗi mở ${appName}`);
        setLastResult({ success: false, label: appName });
      } else {
        setLastResult({ success: true, label: appName });
      }
    } catch {
      toast.error(`Lỗi khi mở ${appName}`);
      setLastResult({ success: false, label: appName });
    }
  };

  const apps = [
    {
      id: 'mini-app-1',
      name: 'Mini App 01',
      desc: 'Mini app 01 test trên môi trường dev',
      color: 'bg-emerald-600',
      num: '1',
    },
    {
      id: 'mini-app-2',
      name: 'Mini App 02',
      desc: 'Mini app 02 test trên môi trường dev',
      color: 'bg-indigo-600',
      isSelf: true,
    },
    {
      id: 'mini-app-3',
      name: 'Mini App 03',
      desc: 'Mini app 03 test trên môi trường dev',
      color: 'bg-orange-600',
      num: '3',
    },
  ];

  return (
    <StandardPage title="Mini App 02">
      {/* Header Banner Area - Flat Look */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 px-6 py-8 text-white">
        <Text variant="sub" color="white" className="opacity-90">Điều hướng deeplink qua các mini app khác</Text>
      </div>

      {/* Content Area - Increased Spacing from Header */}
      <div className="px-4 mt-6 pb-10 flex flex-col gap-6">
        {/* Welcome Section */}
        <Card className="rounded-3xl border-none shadow-none bg-indigo-50 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <User size={24} className="text-indigo-600" />
          </div>
          <div>
            <Text variant="sub" className="text-indigo-800 opacity-70 block mb-0.5">Chào mừng quay lại,</Text>
            <Text variant="base" weight="bold" className="text-indigo-900">
              {displayName} {displayEmail ? `(${displayEmail})` : ''}
            </Text>
          </div>
        </Card>

        <Card className="rounded-3xl border-none shadow-none bg-white p-6 flex flex-col gap-5">
          <Text variant="base" weight="bold" className="text-slate-700">Chuyển đến Mini App khác</Text>
          <div className="flex flex-col gap-4">
            {apps.map(app => (
              <button
                key={app.id}
                onClick={() => !app.isSelf && openApp(app.id, app.name)}
                disabled={app.isSelf}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${app.isSelf ? 'opacity-50 bg-slate-50 border-slate-100' : 'hover:bg-slate-50 border-slate-100 shadow-none'
                  }`}
              >
                <div className={`w-12 h-12 rounded-2xl ${app.color} flex items-center justify-center text-white font-black text-lg shadow-none`}>
                  {app.num || '2'}
                </div>
                <div className="flex-1 text-left">
                  <Text variant="base" weight="bold">{app.name}</Text>
                  <Text variant="sub" className="text-slate-500 line-clamp-1 text-[11px]">{app.desc}</Text>
                </div>
                {!app.isSelf && <ExternalLink size={16} className="text-slate-400" />}
              </button>
            ))}
          </div>
        </Card>

        {lastResult && (
          <div className={`p-4 rounded-2xl border flex items-center gap-3 ${lastResult.success ? 'bg-indigo-50 border-indigo-100' : 'bg-red-50 border-red-100'}`}>
            {lastResult.success ? <CheckCircle2 size={20} className="text-indigo-600" /> : <XCircle size={20} className="text-red-500" />}
            <Text variant="sub" className={lastResult.success ? 'text-indigo-700' : 'text-red-600'}>
              {lastResult.success ? `✅ Mở ${lastResult.label} thành công` : `❌ Lỗi mở ${lastResult.label}`}
            </Text>
          </div>
        )}
      </div>
    </StandardPage>
  );
};

export default DeepLinkHomeScreen;
