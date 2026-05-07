/**
 * @file pages/OverviewScreen.tsx
 * @description Trang tổng quan chính. Header được thiết kế lại gọn gàng và tinh tế hơn.
 */
import React from 'react';
import {
  BookOpen,
  ChevronRight,
  ClipboardCheck,
  Code2,
  Layers3,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { Card, StandardPage, Text } from 'ejsc-ma-component';

const quickActions = [
  { title: 'Components', desc: 'Xem và tái sử dụng UI blocks', icon: Layers3, color: 'text-red-600', bg: 'bg-red-50' },
  { title: 'APIs', desc: 'Kiểm tra bridge APIs tích hợp', icon: Code2, color: 'text-red-600', bg: 'bg-red-50' },
  { title: 'Best Practices', desc: 'Chuẩn code cho dự án mini app', icon: BookOpen, color: 'text-red-600', bg: 'bg-red-50' },
];

const starterSteps = [
  { title: 'Cấu hình navigation', desc: 'Tinh chỉnh routes, app bar và bottom tabs.' },
  { title: 'Kết nối dữ liệu', desc: 'Thay mock data bằng API thật hoặc local data source.' },
  { title: 'Chuẩn hoá UI system', desc: 'Áp typography, spacing, token màu theo guideline.' },
  { title: 'Bật tracking & logging', desc: 'Thêm analytics event và theo dõi runtime logs.' },
];

const OverviewScreen: React.FC = () => {
  const handleRefresh = async () => {
    await new Promise(r => setTimeout(r, 1000));
  };

  return (
    <StandardPage
      onRefresh={handleRefresh}
      hideAppBar
      contentClassName="!px-0 !pt-0"
      className="!bg-[#f4f6fb] !px-0 !pt-0"
    >
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[360px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://plus.unsplash.com/premium_vector-1697729782149-e53d522cb596?q=80&w=1568&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-[#f4f6fb]" />
        </div>

        <div
          className="relative z-10 px-4 pb-8 flex flex-col gap-5"
          style={{ paddingTop: 'calc(var(--safe-top, env(safe-area-inset-top, 0px)) + 16px)' }}
        >
          <section className="rounded-3xl border border-white/30 bg-white/10 backdrop-blur-md p-5 text-white shadow-[0_10px_30px_rgba(15,23,42,0.2)]">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <Text variant="caption" color="white" className="opacity-85 block mb-1">
                  Starter Overview
                </Text>
                <Text variant="h3" weight="bold" color="white">
                  Mini App Foundation
                </Text>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center">
                <Rocket size={20} />
              </div>
            </div>
            <Text variant="sub" color="white" className="opacity-90 leading-relaxed block">
              Trang mẫu khởi đầu để đội ngũ triển khai nhanh flow chính, kiểm thử UI và tích hợp API theo chuẩn dự án.
            </Text>
            <div className="mt-3 inline-flex px-2.5 py-1 rounded-lg bg-white/20 border border-white/20">
              <Text variant="tiny" weight="bold" color="white">
                v1.0
              </Text>
            </div>
          </section>

          <Card className="p-4 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between mb-3">
              <Text variant="base" weight="bold">Quick actions</Text>
              <div className="flex items-center gap-1 text-slate-400">
                <Sparkles size={14} />
                <Text variant="base" className="text-slate-400">Starter kit</Text>
              </div>
            </div>

            <div className="space-y-2.5">
              {quickActions.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.title}
                    className="w-full flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-2.5 text-left active:scale-[0.99] transition-transform"
                  >
                    <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                      <Icon size={18} className={item.color} />
                    </div>
                    <div className="flex-1">
                      <Text variant="base" weight="bold">{item.title}</Text>
                      <Text variant="sub" className="text-slate-500">{item.desc}</Text>
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-4 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardCheck size={16} className="text-red-600" />
              <Text variant="base" weight="bold">Getting started checklist</Text>
            </div>

            <div className="space-y-2">
              {starterSteps.map((step, idx) => (
                <div key={step.title} className="rounded-xl border border-slate-100 p-3">
                  <div className="flex items-center justify-between mb-1">
                    <Text variant="base" weight="bold">{idx + 1}. {step.title}</Text>
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <Text variant="sub" className="text-slate-500">{step.desc}</Text>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={16} className="text-red-600" />
              <Text variant="base" weight="bold">Nội dung đã dùng component chung</Text>
            </div>
            <Text variant="sub" className="text-slate-500 leading-relaxed">
              Trang Overview đã được flow theo component system: StandardPage + Card + Text để đồng bộ với About và UI/UX.
            </Text>
          </Card>
        </div>
      </div>
    </StandardPage>
  );
};

export default OverviewScreen;
