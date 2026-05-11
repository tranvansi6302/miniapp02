import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Text } from 'ejsc-ma-component';
import { cn } from '~/utils/cn';
import voucherIcon from '../../../assets/icons/voucher.png';

export const HomeOfferSection: React.FC = () => {
  const vouchers = [
    { amount: 'Giảm 20%', title: 'Vệ sinh máy lạnh chuyên sâu', code: 'VML20', date: '30/11/2026', tag: 'Hội viên', tagType: 'premium' },
    { amount: 'Voucher 50K', title: 'Dọn dẹp nhà cửa lần đầu', code: 'NEW50', date: '15/12/2026', tag: 'Miễn phí', tagType: 'free' },
    { amount: 'Giảm 30K', title: 'Sửa tủ lạnh tại nhà', code: 'REF30', date: '20/12/2026', tag: 'Hết hạn', tagType: 'expired' }
  ];

  return (
    <div className="flex flex-col gap-2.5 mt-3">
      <div className="flex items-center justify-between px-1">
        <Text variant="base" weight="bold" className="text-ejsc-text-main">Ưu đãi dành cho bạn</Text>
        <button className="flex items-center gap-1 active:opacity-60 transition-opacity">
          <Text variant="sub" weight="bold" className="text-ejsc-brand">Tất cả</Text>
          <ChevronRight size={14} className="text-ejsc-brand mt-0.5" />
        </button>
      </div>

      <div className="flex items-center gap-1.5 my-2 overflow-x-auto no-scrollbar px-4 -mx-4 touch-pan-x overscroll-behavior-x-contain will-change-transform scroll-padding-x-4 scroll-pl-4 scroll-pr-4">
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

      <div className="flex overflow-x-auto gap-3 px-4 -mx-4 no-scrollbar snap-x snap-mandatory touch-pan-x overscroll-behavior-x-contain will-change-transform scroll-padding-x-4 scroll-pl-4 scroll-pr-4">
        {vouchers.map((voucher, idx) => (
          <div
            key={idx}
            className="flex-none w-[230px] snap-start bg-white rounded-ejsc flex items-center h-[78px] border border-ejsc-border overflow-hidden active:scale-[0.98] transition-transform p-2.5 gap-5"
          >
            <div className="w-14 h-14 shrink-0 rounded-ejsc bg-slate-50 flex items-center justify-center overflow-hidden relative border border-slate-100">
              <img src={voucherIcon} alt="voucher" className="w-full h-full object-contain" />
            </div>

            <div className="flex-1 flex flex-col h-full min-w-0">
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-1 ">
                  <Text variant="sub" weight="bold" className="text-ejsc-brand leading-none truncate">
                    {voucher.amount}
                  </Text>
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
  );
};
