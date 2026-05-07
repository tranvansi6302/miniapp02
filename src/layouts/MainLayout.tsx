/**
 * @file layouts/MainLayout.tsx
 * @description Layout chính của ứng dụng — bao gồm Container nội dung và Thanh điều hướng dưới (BottomBar).
 */
import React, { useEffect } from 'react';
import { useLocation, useRouterStore, useNavigate } from 'ejsc-ma-router';
import type { IRouterStoreState } from 'ejsc-ma-router';
import { BottomBar, useNavBar } from 'ejsc-ma-component';
import { apisAsync, type IEjscSetNavigationBarOptions } from 'ejsc-ma-api';
import { getRouterConfig } from '../navigation/router-config';

const routerConfigData = getRouterConfig();

import { Home, LayoutGrid, Calendar, Sparkles, User, Search, History } from 'lucide-react';

/** 
 * Hàm ánh xạ tên icon sang Lucide icons. 
 * Giúp tùy biến giao diện thanh điều hướng dễ dàng.
 */
const getIcon = (name: string) => {
  switch (name) {
    case 'home':
      return <Home size={20} />;
    case 'services':
    case 'grid':
      return <LayoutGrid size={20} />;
    case 'booking':
    case 'calendar':
      return <Calendar size={20} />;
    case 'activities':
    case 'sparkles':
    case 'history':
      return <History size={20} />;
    case 'account':
    case 'user':
      return <User size={20} />;
    default:
      return <Home size={20} />;
  }
};

/**
 * MemoizedBottomBar - Thanh điều hướng dưới cùng, tối ưu để không render lại khi trang cuộn.
 */
interface IBottomBarProps {
  show: boolean;
  items: Array<{ path: string; icon: string; name: string }>;
  currentPath: string;
}

const MemoizedBottomBar = React.memo(({ show, items, currentPath }: IBottomBarProps) => {
  const navigate = useNavigate();
  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] h-[98px] flex flex-col justify-end pointer-events-none">
      <div className="absolute inset-x-0 bottom-0 h-[84px] pointer-events-auto overflow-hidden">
        <svg
          viewBox="0 0 400 84"
          className="w-full h-full fill-white drop-shadow-[0_-5px_14px_rgba(0,0,0,0.06)]"
          preserveAspectRatio="none"
        >
          <path d="M0,84 L400,84 L400,43 Q400,28 385,28 C338,28 318,28 244,28 C233,28 224,13 200,13 C176,13 167,28 156,28 C82,28 62,28 15,28 Q0,28 0,43 Z" />
        </svg>
      </div>

      <div className="relative flex items-end justify-between px-1 pb-2 pointer-events-auto w-full h-full">
        {items.map((tab) => {
          const isActive = currentPath === tab.path;
          const isFAB = tab.path === '/booking';

          if (isFAB) {
            return (
              <div key={tab.path} className="flex-1 flex flex-col items-center justify-end pb-3 h-full">
                <div
                  onClick={() => navigate(tab.path)}
                  className="z-50 -mb-[6px] active:scale-95 transition-all flex items-center justify-center h-[60px] w-[60px]"
                >
                  <div className="h-[35px] w-[35px] rounded-[11px] bg-[#345C5A] overflow-hidden flex items-center justify-center shadow-[0_4px_12px_rgba(52,92,90,0.2)]">
                    <Calendar size={25} className="text-white" />
                  </div>
                </div>
                <span className={`text-ejsc-caption leading-none font-normal ${isActive ? 'text-[#345C5A]' : 'text-slate-900'}`}>
                  {tab.name}
                </span>
              </div>
            );
          }

          return (
            <div
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex-1 flex flex-col items-center justify-end pb-3 h-full transition-all cursor-pointer active:opacity-60 ${isActive ? 'text-[#345C5A]' : 'text-slate-400'}`}
            >
              <div className={`${isActive ? 'scale-105 text-[#345C5A]' : 'text-slate-400'} transition-all mb-1`}>
                {getIcon(tab.icon)}
              </div>
              <span className={`text-ejsc-caption leading-none font-normal ${isActive ? 'text-[#345C5A]' : 'text-slate-400'}`}>
                {tab.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

interface MainLayoutProps {
  children?: React.ReactNode;
}

/**
 * MainLayout - Vỏ bọc ứng dụng, quản lý sự đồng bộ giữa Web và Native Navigation.
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pageLocation = useLocation();

  // Lấy trạng thái Router từ Store
  const isTransitioning = useRouterStore((s: IRouterStoreState) => s.isPending);
  const histories = useRouterStore((s: IRouterStoreState) => s.histories);
  const globalLastHistory = histories[histories.length - 1];

  // Kiểm tra instance Layout này có đang ở trên cùng (Active) không
  const isActive = globalLastHistory?.location?.key === pageLocation.key;

  const { updateNavBar } = useNavBar();

  const currentPage = routerConfigData.pages.find(p => p.pathname === pageLocation.pathname);
  const showAppBar = currentPage?.showAppBar ?? true;
  const showBottomNav = currentPage?.showBottomNav ?? true;

  /** 
   * Đồng bộ hóa Header (AppBar) giữa các môi trường.
   * Khi một trang mới được mount, Layout sẽ báo cho Bridge và NavBarContext cập nhật UI.
   */
  useEffect(() => {
    if (isActive && currentPage) {
      // Thiết lập thanh điều hướng Native Bridge
      const navOptions: IEjscSetNavigationBarOptions = {
        visible: false, // Luôn ẩn Native Bar để dùng Web Custom Bar cho mượt
        immersive: true,
        title: currentPage.appBar.type === 'native' ? currentPage.appBar.title : '',
        backIcon: currentPage.appBar.type === 'native' ? (currentPage.appBar.backIcon || (pageLocation.pathname === '/' ? 'none' : 'arrow')) : 'none'
      };

      apisAsync.setNavigationBar(navOptions);

      // Cập nhật Simulator NavBar (Dùng cho môi trường Browser/Debug)
      if (!showAppBar) {
        updateNavBar({ visible: false, title: '', backIcon: 'none' });
      } else if (currentPage.appBar.type === 'native') {
        updateNavBar({
          visible: true,
          title: currentPage.appBar.title,
          backIcon: currentPage.appBar.backIcon || (pageLocation.pathname === '/' ? 'none' : 'arrow')
        });
      } else {
        updateNavBar({ visible: false, title: '', backIcon: 'none' });
      }
    }
  }, [isActive, pageLocation.pathname, updateNavBar, currentPage, showAppBar]);

  return (
    <div
      className="app-layout"
      style={{
        pointerEvents: isTransitioning ? 'none' : 'auto', // Chặn tương tác khi đang animation chuyển trang
        background: 'var(--color-ejsc-bg-page)'
      }}
    >
      {/* Vùng nội dung chính của trang */}
      <main className="app-main">
        {children}
      </main>

      {/* Thanh Bottom Nav */}
      <MemoizedBottomBar
        show={showBottomNav}
        items={routerConfigData.bottomTabBar.items}
        currentPath={pageLocation.pathname}
      />
    </div>
  );
};

export default React.memo(MainLayout);
