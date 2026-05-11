/**
 * @file screens/Activities/ApiScreen.tsx
 * @description Trang kiểm tra các API Native tích hợp - miniapp-02.
 */
import React, { useState } from 'react';
import {
  Button,
  Card,
  Text,
  toast,
  StandardPage
} from 'ejsc-ma-component';
import {
  Zap,
  Box,
  Database,
  Image as ImageIcon,
  Navigation,
  Smartphone,
  Share2
} from 'lucide-react';
import { API_GROUPS } from '~/constants/apiGroups';

const ApiScreen: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, any>>({});

  const [apiParams, setApiParams] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    API_GROUPS.forEach(group => {
      group.apis.forEach(api => {
        if (api.params) initial[api.id] = '';
      });
    });
    return initial;
  });

  const runApi = async (id: string, name: string, fn: (p?: any) => Promise<any>) => {
    setLoading(id);
    let paramsObj = undefined;
    if (apiParams[id]) {
      try {
        paramsObj = JSON.parse(apiParams[id]);
      } catch {
        toast.error('JSON không hợp lệ!');
        setLoading(null);
        return;
      }
    }
    const res = await fn(paramsObj);
    console.log(`[API ${name}] Result:`, res);
    setResults(prev => ({ ...prev, [id]: res }));
    if (res.success) {
      toast.success(`${name} thành công!`);
    } else {
      toast.error(`Lỗi ${name}: ${res.data?.message || res.data || 'Không rõ'}`);
    }
    setLoading(null);
  };

  const handleParamChange = (id: string, value: string) => {
    setApiParams(prev => ({ ...prev, [id]: value }));
  };

  const JsonView = ({ data }: { data: any }) => {
    if (data === undefined || data === null) return null;
    return (
      <div className="mt-2 p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-300 leading-normal overflow-auto max-h-48">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };

  const handleRefresh = async () => {
    await new Promise(r => setTimeout(r, 800));
    setResults({});
    toast.success('Đã làm mới');
  };

  const getGroupIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('system')) return <Smartphone size={16} />;
    if (n.includes('navigation')) return <Share2 size={16} />;
    if (n.includes('storage')) return <Database size={16} />;
    if (n.includes('media')) return <ImageIcon size={16} />;
    if (n.includes('location')) return <Navigation size={16} />;
    return <Box size={16} />;
  };

  return (
    <StandardPage title="Bridge APIs" onRefresh={handleRefresh}>
      <div className="flex flex-col gap-6 p-4">
        {API_GROUPS.map((group, gIdx) => (
          <Card key={gIdx} className="p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-2">
              <div className="text-blue-600">{getGroupIcon(group.name)}</div>
              <Text variant="base" weight="bold" className="uppercase tracking-wider text-slate-700">{group.name}</Text>
            </div>
            <div className="flex flex-col gap-4">
              {group.apis.map((api, iIdx) => (
                <div
                  key={api.id}
                  className={`flex flex-col pb-4 ${iIdx !== group.apis.length - 1 ? 'border-b border-slate-50' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex flex-col gap-0.5 flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <Text variant="base" weight="semibold" className="text-slate-800">{api.name}</Text>
                        {api.params && (
                          <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full font-bold uppercase">Params</span>
                        )}
                      </div>
                      <Text variant="sub" color="sub" className="text-[11px]">{api.desc}</Text>
                    </div>
                    <Button
                      size="sm"
                      className="rounded-xl px-4 shadow-sm"
                      loading={loading === api.id}
                      onClick={() => runApi(api.id, api.name, api.fn)}
                    >
                      Call
                    </Button>
                  </div>

                  {api.params && (
                    <div className="mt-2 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Input JSON</span>
                        <button
                          onClick={() => handleParamChange(api.id, api.params!)}
                          className="text-[10px] text-blue-500 font-bold"
                        >
                          Dùng gợi ý
                        </button>
                      </div>
                      <textarea
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px] text-slate-700 focus:outline-none focus:border-blue-300 min-h-[60px]"
                        value={apiParams[api.id] || ''}
                        onChange={(e) => handleParamChange(api.id, e.target.value)}
                        placeholder='{"key": "value"}'
                      />
                    </div>
                  )}

                  {results[api.id] && (
                    <div className="mt-3">
                      <div className={`text-[10px] font-bold uppercase mb-1 flex items-center gap-1 ${results[api.id].success ? 'text-green-500' : 'text-red-500'}`}>
                        <Zap size={10} />
                        {results[api.id].success ? 'Response:' : 'Error:'}
                      </div>
                      <JsonView data={results[api.id]} />
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
