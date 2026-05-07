/**
 * @file screens/ApiScreen.tsx
 * @description Trang kiểm tra các API Native tích hợp.
 */
import React, { useState } from 'react';
import {
  Button,
  Card,
  Text,
  toast,
  StandardPage
} from 'ejsc-ma-component';
import { apisAsync } from 'ejsc-ma-api';
import {
  Zap,
  Bell,
  Share2,
  Box,
  Layout,
  Database,
  Clipboard,
  Image as ImageIcon,
  Globe as GlobeIcon,
  Lock,
  MessageSquare,
  Smartphone,
  Navigation
} from 'lucide-react';
import { API_GROUPS } from '../constants/apiGroups';

const ApiScreen: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, any>>({});

  const runApi = async (id: string, name: string, fn: () => Promise<any>) => {
    setLoading(id);
    try {
      const res = await fn();
      console.log(`[API ${name}] Result:`, res);
      setResults(prev => ({ ...prev, [id]: { success: true, data: res } }));
      toast.success(`API ${name} thành công!`);
    } catch (err: any) {
      console.error(`[API ${name}] Error:`, err);
      setResults(prev => ({ ...prev, [id]: { success: false, data: err.message || err } }));
      toast.error(`Lỗi API ${name}: ${err.message || 'Không rõ lỗi'}`);
    } finally {
      setLoading(null);
    }
  };

  const JsonView = ({ data }: { data: any }) => {
    if (data === undefined || data === null) return null;

    const formatValue = (val: any) => {
      if (typeof val === 'string') return <span className="text-green-600">"{val}"</span>;
      if (typeof val === 'number') return <span className="text-blue-600">{val}</span>;
      if (typeof val === 'boolean') return <span className="text-purple-600">{val.toString()}</span>;
      return <span>{JSON.stringify(val)}</span>;
    };

    return (
      <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100 font-mono text-[11px] overflow-x-auto">
        <div className="flex flex-col gap-1">
          {typeof data === 'object' ? (
            Object.entries(data).map(([key, val]) => (
              <div key={key} className="flex gap-2">
                <span className="text-red-500 shrink-0">"{key}":</span>
                <span className="break-all">{formatValue(val)}</span>
              </div>
            ))
          ) : (
            <div className="text-gray-700 break-all">{data.toString()}</div>
          )}
        </div>
      </div>
    );
  };

  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString());

  const handleRefresh = async () => {
    await new Promise(r => setTimeout(r, 800));
    setResults({});
    const time = new Date().toLocaleTimeString();
    setLastUpdated(time);
    toast.success(`Đã làm mới dữ liệu lúc ${time}`);
  };

  const getGroupIcon = (name: string) => {
    switch (name) {
      case 'System': return <Smartphone size={16} />;
      case 'Navigation Bar': return <Layout size={16} />;
      case 'Navigation / DeepLink': return <Share2 size={16} />;
      case 'Storage': return <Database size={16} />;
      case 'Clipboard': return <Clipboard size={16} />;
      case 'UI Dialogs': return <Bell size={16} />;
      case 'Media': return <ImageIcon size={16} />;
      case 'Network': return <GlobeIcon size={16} />;
      case 'Auth & User': return <Lock size={16} />;
      case 'Device': return <Navigation size={16} />;
      default: return <Box size={16} />;
    }
  };

  return (
    <StandardPage
      title="Native Bridge APIs"
      onRefresh={handleRefresh}
    >
      <div className="flex flex-col gap-6 p-6">
        {API_GROUPS.map((group, gIdx) => (
          <Card key={gIdx} className="p-4 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)] mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-red-600">{getGroupIcon(group.name)}</div>
              <Text variant="base" weight="bold">{group.name}</Text>
            </div>
            <div className="flex flex-col">
              {group.apis.map((api, iIdx) => (
                <div
                  key={api.id}
                  className={`flex flex-col py-3 ${iIdx !== group.apis.length - 1 ? 'border-b border-slate-100' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1 flex-1 pr-4">
                      <Text variant="base" weight="semibold">{api.name}</Text>
                      <Text variant="sub" color="sub">{api.desc}</Text>
                    </div>
                    <Button
                      size="sm"
                      theme="neutral"
                      loading={loading === api.id}
                      onClick={() => runApi(api.id, api.name, api.fn)}
                    >
                      Called
                    </Button>
                  </div>
                  {results[api.id] && (
                    <div className="mt-2">
                      <div className={`text-[10px] font-bold uppercase mb-1 ${results[api.id].success ? 'text-green-500' : 'text-red-500'}`}>
                        {results[api.id].success ? 'Success Result:' : 'Error Result:'}
                      </div>
                      <JsonView data={results[api.id].data} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}

        <div className="h-10" />
      </div>
    </StandardPage>
  );
};

export default ApiScreen;
