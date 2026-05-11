import React from 'react';
import { Text } from 'ejsc-ma-component';
import { cn } from '~/utils/cn';
import tatcaIcon from '../../../assets/icons/tatca.png';

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

export const HomeServiceGrid: React.FC = () => {
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between px-1">
        <Text variant="base" weight="bold" className="text-ejsc-text-main">Danh mục nổi bật</Text>
      </div>
      <div className="mt-3 bg-white rounded-ejsc-main">
        <div className="grid grid-cols-4 w-full pt-1">
          {gridServices.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-1.5 p-1.5 text-center cursor-pointer active:bg-slate-50 transition-colors relative group"
            >
              {item.tag && (
                <div className={cn(
                  "absolute -top-1 -right-1 w-8 h-8 flex items-center justify-center rounded-full shadow-xs z-10 scale-90 origin-top-right",
                  item.tagBg || "bg-red-100"
                )}>
                  <span className={cn("text-[8px] font-bold leading-none uppercase tracking-tighter", item.tagText || "text-red-600")}>
                    {item.tag}
                  </span>
                </div>
              )}
              <div className="w-13.5 h-13.5 flex items-center justify-center mb-0.5 bg-slate-50 rounded-full p-2.5 shadow-sm group-active:scale-95 transition-transform">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain opacity-95" />
              </div>
              <Text variant="caption" className="line-clamp-2 min-h-[2.4em] flex items-center justify-center leading-tight">
                {item.title}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
