/**
 * @file screens/AboutScreen.tsx
 * @description Trang thông tin về Mini App.
 */
import React from 'react';
import {
  Button,
  Card,
  StandardPage,
  Text,
  toast,
} from 'ejsc-ma-component';
import {
  BookOpenText,
  Code2,
  Globe,
  LogIn,
  Mail,
  MessageCircleMore,
} from 'lucide-react';
import { Link } from 'ejsc-ma-router';

const productHighlights = [
  'Starter template tối ưu cho luồng Mini App thực tế.',
  'Chuẩn hoá UI system để mở rộng nhanh theo module.',
  'Sẵn sàng tích hợp native bridge APIs và tracking.',
];

const AboutScreen: React.FC = () => {
  const handleRefresh = async () => {
    await new Promise(r => setTimeout(r, 600));
    toast.success('Đã làm mới thông tin phiên bản');
  };

  return (
    <StandardPage title="About Mini App" onRefresh={handleRefresh}>
      <div className="flex flex-col gap-6 p-6">
        <section className="rounded-3xl bg-linear-to-br from-red-600 to-rose-500 p-5 text-white shadow-[0_10px_30px_rgba(220,38,38,0.3)]">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <Text variant="sub" color="white" className="opacity-90 block mb-1">
                Product Overview
              </Text>
              <Text variant="h3" weight="bold" color="white">
                EJSC Mini App
              </Text>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center">
              <BookOpenText size={20} />
            </div>
          </div>
          <Text variant="sub" color="white" className="opacity-90 block leading-relaxed">
            Nền tảng khởi đầu giúp team triển khai mini app nhanh, đồng bộ design và ổn định khi mở rộng.
          </Text>
          <div className="mt-3 inline-flex px-2.5 py-1 rounded-lg bg-white/20 border border-white/20">
            <Text variant="tiny" weight="bold" color="white">Version 1.0.3</Text>
          </div>
        </section>

        <Card className="p-4 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <Text variant="base" weight="bold" className="mb-3">Why this starter</Text>
          <div className="space-y-2">
            {productHighlights.map(item => (
              <div key={item} className="flex items-start gap-2">
                <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <Text variant="sub" className="text-slate-600 leading-relaxed">{item}</Text>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 grid gap-2">
            <div className="flex items-center gap-2.5">
              <Mail size={16} className="text-slate-400" />
              <Text variant="sub" className="text-slate-600">support@ejsc.example.com</Text>
            </div>
            <div className="flex items-center gap-2.5">
              <Globe size={16} className="text-slate-400" />
              <Text variant="sub" className="text-slate-600">www.ejsc-miniapp.com</Text>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-3">
          <Button size='sm' theme="neutral" block startIcon={<Code2 size={16} />}>
            Source
          </Button>
          <Button size='sm' theme="brand" block startIcon={<MessageCircleMore size={16} />}>
            Feedback
          </Button>
          <Link to="/login" className="block">
            <Button size='sm' theme="neutral" block startIcon={<LogIn size={16} />}>
              Login
            </Button>
          </Link>
        </div>

        <Text variant="sub" color="sub" className="text-center opacity-60 mt-2">
          © 2024 EJSC Technology. All rights reserved.
        </Text>
      </div>
    </StandardPage>
  );
};

export default AboutScreen;
