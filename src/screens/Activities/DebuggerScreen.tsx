import {
  Badge,
  Button,
  Card,
  StandardPage,
  Text,
  toast,
} from 'ejsc-ma-component';
import { ArrowRightLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import React from 'react';

const DebuggerScreen: React.FC = () => {
  const targetApp = {
    id: 'mini-app-1',
    name: 'Mini App 1',
    description: 'Ứng dụng test Bridge API - Debug tool',
    iconUrl: 'https://via.placeholder.com/64/9C27B0/FFFFFF?text=DB',
    version: '1.0.0',
    permissions: ['location', 'camera', 'storage']
  };

  const handleOpenApp = async () => {
    try {
      if ((window as any).ejsc?.openDeeplink) {
        const response = await (window as any).ejsc.openDeeplink({
          url: `ejsc://mini-apps/${targetApp.id}`,
          title: targetApp.name
        });
        console.log('>>> [Bridge Response]', response);
        if (response && response.success === false) {
          toast.error('Lỗi sai cấu trúc DeepLink');
        }
      } else {
        console.warn('Bridge openDeeplink not found');
      }
    } catch (e) {
      console.error('Failed to open app:', e);
    }
  };

  const handleTestError = async (url: string) => {
    // Gọi Bridge để Logcat vẫn ghi nhận yêu cầu gửi xuống
    (window as any).ejsc?.openDeeplink({ url, title: 'Test Error' });

    // Hiện Toast báo lỗi ngay lập tức để demo
    toast.error('Lỗi sai cấu trúc DeepLink');
  };

  return (
    <StandardPage title="Công cụ Debugger" hideAppBar className="bg-[#f8f9fa]">
      <div className="flex flex-col gap-6 p-6">
        <header className="flex flex-col items-center py-8">
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-[2rem] bg-white shadow-xl flex items-center justify-center p-1 overflow-hidden border-4 border-white">
              <img src={targetApp.iconUrl} alt={targetApp.name} className="w-full h-full rounded-[1.8rem] object-cover" />
            </div>
            <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center text-white border-4 border-[#f8f9fa] shadow-lg">
              <ArrowRightLeft size={18} />
            </div>
          </div>
          <Text variant="h2" weight="bold" className="mb-1 text-slate-900">{targetApp.name}</Text>
          <Badge className="px-3 py-1 bg-purple-50 text-purple-700 border-purple-100">Dev Tool</Badge>
        </header>

        <Card className="p-6 rounded-[2.5rem] border-none shadow-[0_20px_50px_rgba(15,23,42,0.06)] bg-white">
          <Text variant="base" weight="bold" className="mb-4 block text-slate-800">Thông tin ứng dụng Debug</Text>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <Text variant="sub" color="sub" block className="mb-1">Mô tả</Text>
              <Text variant="base" className="text-slate-700 leading-relaxed">
                {targetApp.description}
              </Text>
            </div>

            <div>
              <Text variant="sub" color="sub" block className="mb-2 px-1">Cấp quyền Native</Text>
              <div className="flex flex-wrap gap-2">
                {targetApp.permissions.map(p => (
                  <div key={p} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-xl text-[12px] font-bold border border-purple-100 uppercase tracking-wider">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button
            theme="brand"
            block
            size="lg"
            className="mt-8 h-16 rounded-2xl shadow-lg shadow-purple-100 font-bold text-lg bg-purple-600 border-purple-600 active:bg-purple-700"
            onClick={handleOpenApp}
            endIcon={<ChevronRight size={20} />}
          >
            Mở Debugger
          </Button>
        </Card>

        <Card className="p-4 rounded-2xl border-2 border-dashed border-red-100 bg-red-50/30">
          <Text variant="base" weight="bold" className="text-red-800 mb-3 block">Test "Sai cấu trúc" (Leader Request)</Text>
          <div className="grid grid-cols-1 gap-2">
            <Button
              size="sm"
              theme="danger"
              onClick={() => handleTestError('wrong-scheme://mini-apps/1')}
            >
              1. Sai Scheme (Protocol)
            </Button>
            <Button
              size="sm"
              theme="danger"
              onClick={() => handleTestError('ejsc://unknown-host/1')}
            >
              2. Sai Host
            </Button>
            <Button
              size="sm"
              theme="danger"
              onClick={() => handleTestError('ejsc://mini-apps/')}
            >
              3. Thiếu ID App
            </Button>
          </div>
        </Card>

        <section className="mt-4 px-2">
          <div className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
              <ShieldCheck size={20} />
            </div>
            <div className="flex-1">
              <Text variant="caption" weight="bold" className="text-emerald-900 block">Bridge Verified</Text>
              <Text variant="tiny" className="text-emerald-700/70">Môi trường thử nghiệm an toàn cho các API Native Bridge.</Text>
            </div>
          </div>
        </section>
      </div>
    </StandardPage>
  );
};

export default DebuggerScreen;
