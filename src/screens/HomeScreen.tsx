/**
 * @file pages/HomeScreen.tsx
 * @description Trang chủ chuẩn hóa sử dụng Tokens và Component hệ thống.
 */
import React from 'react';
import {
  Search,
  ChevronDown,
  ChevronRight,
  Calendar,
  Coins,
  User,
  Star,
  Users,
  Crown,
  ShieldCheck,
  LayoutGrid
} from 'lucide-react';
import { Card, StandardPage, Text, Button } from 'ejsc-ma-component';
import { useAuthStore } from '~/stores/auth.store';
import { cn } from '~/utils/cn';
import { apisAsync } from 'ejsc-ma-api';

import dondepIcon from '../assets/dondep.png';
import suachuaIcon from '../assets/suachua.png';
import mebeIcon from '../assets/mebe.png';
import massageIcon from '../assets/massage.png';
import giaoducIcon from '../assets/giaoduc.png';
import suckhoeIcon from '../assets/suckhoe.png';
import petIcon from '../assets/pet.png';
import tatcaIcon from '../assets/tatca.png';
import congdongIcon from '../assets/congdong.png';
import hoivienIcon from '../assets/hoivien.png';
import chuyengiaIcon from '../assets/chuyengia.png';
import appLogo from '../assets/Icon.png';
import voucherIcon from '../assets/voucher.png';
import appGift from '../assets/gift.png';
import bgHeader from '../assets/bg-header.jpg';
import quickBookingIcon from '../assets/quick-booking.png';

const gridServices = [
  { title: 'Vệ sinh & Tiện ích', image: 'https://homebooking.global/assets/services/icon_36.png', tag: 'HOT', tagBg: 'bg-red-100', tagText: 'text-red-600' },
  { title: 'Kỹ thuật & Điện nước', image: 'https://homebooking.global/assets/services/icon_48.png' },
  { title: 'Mẹ & Bé', image: 'https://homebooking.global/assets/services/icon_21.png', tag: 'NEW', tagBg: 'bg-blue-100', tagText: 'text-blue-600' },
  { title: 'Làm đẹp & Styling', image: 'https://homebooking.global/assets/services/icon_1.png' },
  { title: 'Giáo dục & Training', image: 'https://homebooking.global/assets/services/icon_81.png' },
  { title: 'Y tế & Xét nghiệm', image: 'https://homebooking.global/assets/services/icon_10.png' },
  { title: 'Dịch vụ thú cưng', image: 'https://homebooking.global/assets/services/icon_64.png', tag: 'SALE', tagBg: 'bg-orange-100', tagText: 'text-orange-600' },
  { title: 'Xem tất cả', image: tatcaIcon },
];

const HomeScreen: React.FC = () => {
  const { user } = useAuthStore();
  const handleRefresh = async () => {
    await new Promise((r) => setTimeout(r, 1000));
  };

  return (
    <StandardPage
      onRefresh={handleRefresh}
      hideAppBar
    >
      <div className="relative bg-ejsc-bg-page min-h-screen">
        {/* Landscape Banner Background */}
        <div className="absolute inset-x-0 top-0 h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgHeader})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-ejsc-bg-page/40" />
        </div>

        {/* Floating Topbar */}
        <div
          className="relative z-20 px-3 flex items-center justify-between gap-1.5"
          style={{ paddingTop: 'calc(var(--safe-top, env(safe-area-inset-top, 0px)) + 6px)' }}
        >
          {/* Logo Icon */}
          <div className="w-11 h-11 shrink-0 flex items-center justify-center select-none active:scale-95 transition-transform">
            <img src={appLogo} alt="logo" className="w-full h-full object-contain" />
          </div>

          {/* Search Bar & Region */}
          <div className="flex-1 flex items-center justify-between gap-1 bg-transparent rounded-ejsc-main px-4 h-11 border border-white/20 backdrop-blur-md min-w-0">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Search size={14} className="text-white/80 shrink-0" />
              <input
                type="text"
                placeholder="Tìm dịch vụ..."
                className="flex-1 bg-transparent border-none outline-none text-ejsc-sub font-normal text-white placeholder:text-white/60 min-w-0"
              />
            </div>
            <div className="flex items-center gap-0.5 shrink-0 px-1 border-l border-white/10 pl-2 active:opacity-70 transition-opacity cursor-pointer">
              <span className="text-ejsc-sub text-white/90 font-normal whitespace-nowrap">Khu vực</span>
              <ChevronDown size={14} className="text-white/70 shrink-0" />
            </div>
          </div>

          {/* Gift Icon button */}
          <div className="w-11 h-11 shrink-0 flex items-center justify-center select-none active:scale-95 transition-transform bg-transparent rounded-ejsc-main border border-white/20 shadow-sm backdrop-blur-md">
            <img src={appGift} alt="gift" className="w-[95%] h-[95%] object-contain" />
          </div>

          {/* Biz button - Dùng ejsc-brand thay vì fix cứng màu */}
          <div 
            onClick={() => {
              apisAsync.openNativeWindow({ 
                url: 'https://mini-app-debugger-z6kv.vercel.app/',
                title: 'My Biz'
              });
            }}
            className="flex items-center gap-2 shrink-0 px-3.5 h-11 rounded-ejsc-main bg-transparent select-none active:scale-95 transition-transform shadow-sm border border-white/20 backdrop-blur-md"
          >
            <div className="w-6 h-6 flex items-center justify-center relative">
              <LayoutGrid size={18} className="text-white" />
            </div>
            <Text weight='medium' variant="caption" className="text-white tracking-wider">Mybiz</Text>
          </div>
        </div>

        {/* Top welcome & balance bar */}
        <div className="relative z-10 px-4 flex flex-col pt-1 pb-[25px] select-none" style={{ marginTop: '55px' }}>
          <div className="flex items-center justify-between mb-1">
            <Text variant="sub" weight="bold" className="text-white drop-shadow-md">
              Chào {user ? `${user.FirstName || ''} ${user.LastName || ''}`.trim() : 'bạn'}
            </Text>
            <div className="flex items-center gap-1.5 bg-transparent px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
              <Text variant="sub" weight="bold" className="text-white">1.200.000đ</Text>
              <Coins size={14} className="text-white shrink-0" />
            </div>
          </div>
        </div>

        {/* Main Curved Content */}
        <div className="relative z-20 bg-gradient-to-b from-ejsc-bg-page via-white via-[10%] to-white px-4 pt-5 pb-8 flex flex-col gap-2.5 min-h-screen -mt-2 shadow-2xl rounded-t-(--ejsc-sys-radius)">

          {/* Quick Stats - 3 mini items (Manual div instead of Card) */}
          <div
            className="bg-white rounded-ejsc select-none -mt-12 z-30 relative mx-0.5 border border-slate-50"
            style={{ boxShadow: 'rgba(0, 0, 0, 0.03) 0px 1px 1px 0px' }}
          >
            <div className="grid grid-cols-3 divide-x divide-slate-100 py-3.5">
              {[
                { icon: Users, label: 'Cộng đồng', sub: 'Kết nối & chia sẻ', color: 'text-ejsc-brand-sub' },
                { icon: Crown, label: 'Hội viên', sub: 'Quyền lợi đặc biệt', color: 'text-ejsc-brand' },
                { icon: ShieldCheck, label: 'Chuyên gia', sub: 'Tư vấn chuyên sâu', color: 'text-ejsc-success' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center px-1 active:opacity-70 transition-opacity cursor-pointer group"
                >
                  <div className="flex flex-row items-center gap-1.5 mb-1">
                    <item.icon size={16} className={cn("shrink-0", item.color)} />
                    <Text variant="sub" weight="bold" className="text-slate-800 leading-none">
                      {item.label}
                    </Text>
                  </div>
                  <Text variant="caption" className="text-slate-400 font-normal">
                    {item.sub}
                  </Text>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action banner card (Refined to match image) */}
         <div className="rounded-full bg-origin-border bg-linear-to-r from-[#fbf8f6] to-[#FEF3EB] border border-ejsc-brand/10 flex items-center justify-between px-3.5 py-1.5 select-none gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-12 h-12 shrink-0 rounded-full bg-white/60 flex items-center justify-center">
              <img src={quickBookingIcon} alt="Quick Booking" />
              </div>
              <div className="flex flex-col min-w-0">
                <Text variant="sub" weight="semibold" className="text-slate-800">Bạn cần dịch vụ ngay</Text>
                <Text variant="caption" className="text-slate-500">Không cần đăng nhập</Text>
              </div>
            </div>
            <Button
              theme="brand"
              size="sm"
              className='rounded-full'

            >
              Đặt ngay
            </Button>
          </div>

          {/* Service Section */}
          <div className="mt-3">
            <div className="flex items-center justify-between px-1">
              <Text variant="base" weight="bold" className="text-ejsc-text-main">Danh mục nổi bật</Text>
              {/* <button className="flex items-center gap-1 active:opacity-60 transition-opacity">
                <Text variant="sub" weight="bold" className="text-ejsc-brand">Tất cả</Text>
                <ChevronRight size={14} className="text-ejsc-brand mt-0.5" />
              </button> */}
            </div>
            {/* Services Grid Section (Manual div with dividers) */}
            <div className="mt-3 bg-white rounded-ejsc-main">
              {/* <div className="mt-3 bg-white rounded-ejsc-main  border border-ejsc-border overflow-hidden"></div> */}
              <div className="grid grid-cols-4 w-full pt-1">
                {/* <div className="grid grid-cols-4 w-full divide-x divide-y divide-ejsc-border"></div> */}
                {gridServices.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-1.5 p-1.5 text-center cursor-pointer active:bg-slate-50 transition-colors relative group"
                  >
                    {(item as any).tag && (
                      <div className={cn(
                        "absolute -top-1 -right-1 w-8 h-8 flex items-center justify-center rounded-full shadow-xs z-10 scale-90 origin-top-right",
                        (item as any).tagBg || "bg-red-100"
                      )}>
                        <span className={cn("text-[8px] font-bold leading-none uppercase tracking-tighter", (item as any).tagText || "text-red-600")}>
                          {(item as any).tag}
                        </span>
                      </div>
                    )}
                    <div className="w-13.5 h-13.5 flex items-center justify-center mb-0.5 bg-slate-50 rounded-full p-2.5 shadow-sm group-active:scale-95 transition-transform">
                      <img src={(item as any).image} alt={item.title} className="w-full h-full object-contain opacity-95" />
                    </div>
                    <Text variant="caption" className="line-clamp-2 min-h-[2.4em] flex items-center justify-center leading-tight">
                      {item.title}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Offers Section */}
          <div className="flex flex-col gap-2.5 mt-3">
            <div className="flex items-center justify-between px-1">
              <Text variant="base" weight="bold" className="text-ejsc-text-main">Ưu đãi dành cho bạn</Text>
              <button className="flex items-center gap-1 active:opacity-60 transition-opacity">
                <Text variant="sub" weight="bold" className="text-ejsc-brand">Tất cả</Text>
                <ChevronRight size={14} className="text-ejsc-brand mt-0.5" />
              </button>
            </div>

            {/* Category Filters */}
            <div
              className="flex items-center gap-1.5 my-2 overflow-x-auto no-scrollbar px-4 -mx-4 touch-pan-x overscroll-behavior-x-contain will-change-transform scroll-padding-x-4 scroll-pl-4 scroll-pr-4"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {[
                { label: 'Tất cả', active: true },
                { label: 'Miễn phí', active: false },
                { label: 'Giá trị lớn', active: false },
                { label: 'Đừng bỏ lỡ', active: false }
              ].map((filter, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full border text-[12px] font-medium whitespace-nowrap transition-all active:scale-95",
                    filter.active
                      ? "bg-ejsc-brand-sub border-ejsc-brand-sub text-white"
                      : "bg-white border-ejsc-border text-slate-500"
                  )}
                >
                  {filter.label}
                </div>
              ))}
            </div>

            <div
              className="flex overflow-x-auto gap-3 px-4 -mx-4 no-scrollbar snap-x snap-mandatory touch-pan-x overscroll-behavior-x-contain will-change-transform scroll-padding-x-4 scroll-pl-4 scroll-pr-4"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {[
                { amount: 'Giảm 20%', title: 'Vệ sinh máy lạnh chuyên sâu', code: 'VML20', date: '30/11/2026', tag: 'Hội viên', tagType: 'premium' },
                { amount: 'Voucher 50K', title: 'Dọn dẹp nhà cửa lần đầu', code: 'NEW50', date: '15/12/2026', tag: 'Miễn phí', tagType: 'free' },
                { amount: 'Giảm 30K', title: 'Sửa tủ lạnh tại nhà', code: 'REF30', date: '20/12/2026', tag: 'Hết hạn', tagType: 'expired' }
              ].map((voucher, idx) => (
                <div
                  key={idx}
                  className="flex-none w-[230px] snap-start bg-white rounded-ejsc flex items-center h-[78px]  border border-ejsc-border overflow-hidden active:scale-[0.98] transition-transform p-2.5 gap-5"
                >
                  {/* Left Side: Voucher Icon */}
                  <div className="w-14 h-14 shrink-0 rounded-ejsc bg-slate-50 flex items-center justify-center overflow-hidden relative border border-slate-100">
                    <img src={voucherIcon} alt="voucher" className="w-full h-full object-contain" />
                  </div>

                  {/* Right Side: Details */}
                  <div className="flex-1 flex flex-col h-full min-w-0">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between gap-1 ">
                        <Text variant="sub" weight="bold" className="text-ejsc-brand leading-none truncate">
                          {voucher.amount}
                        </Text>
                        {/* Tag/Badge */}
                        <div className={cn(
                          "px-1.5 py-0.5 rounded-[4px] text-[9px] font-bold uppercase tracking-tight",
                          voucher.tagType === 'premium' && "bg-orange-100 text-orange-600",
                          voucher.tagType === 'free' && "bg-green-100 text-green-600",
                          voucher.tagType === 'expired' && "bg-slate-100 text-slate-500"
                        )}>
                          {voucher.tag}
                        </div>
                      </div>
                      <Text variant="sub" weight="medium" className="text-slate-800 line-clamp-1 leading-tight">
                        {voucher.title}
                      </Text>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <Text variant="tiny" className="text-slate-400 font-medium scale-90 origin-left">HSD: {voucher.date}</Text>
                      <div className="w-1.5 h-1.5 rounded-full bg-ejsc-brand/20 animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StandardPage>
  );
};

export default HomeScreen;

