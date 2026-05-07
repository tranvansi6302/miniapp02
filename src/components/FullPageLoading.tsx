/**
 * @file components/FullPageLoading.tsx
 * @description Component hiển thị loading toàn màn hình với hiệu ứng Dual Ring (Đã tối ưu WebView).
 */
import React from 'react';

const FullPageLoading: React.FC = () => {
  return (
    <div 
      id="full-page-loading"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none pointer-events-auto"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none'
      }}
    >
      <div className="flex flex-col items-center gap-10 translate-y-[-20px]">
        {/* Dual Ring Loader */}
        <div className="dual-loader transform-gpu will-change-transform"></div>

        {/* Text loading */}
        <div 
          className="text-white text-[1.4rem] font-medium tracking-wider opacity-90 animate-pulse"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
        >
          Đang đăng nhập...
        </div>
      </div>
    </div>
  );
};

export default FullPageLoading;
