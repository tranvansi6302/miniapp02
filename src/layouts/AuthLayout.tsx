import React, { useEffect } from 'react';
import { useLocation, useRouterStore } from 'ejsc-ma-router';
import type { IRouterStoreState } from 'ejsc-ma-router';
import { useNavBar } from 'ejsc-ma-component';
import { apisAsync, type IEjscSetNavigationBarOptions } from 'ejsc-ma-api';
import { appRouterConfig } from '../navigation';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const pageLocation = useLocation();
  const isTransitioning = useRouterStore((s: IRouterStoreState) => s.isPending);
  const histories = useRouterStore((s: IRouterStoreState) => s.histories);
  const globalLastHistory = histories[histories.length - 1];
  const isActive = globalLastHistory?.location?.key === pageLocation.key;

  const { updateNavBar } = useNavBar();
  const currentPage = appRouterConfig.pages.find(p => p.pathname === pageLocation.pathname);

  useEffect(() => {
    if (isActive && currentPage) {
      const navOptions: IEjscSetNavigationBarOptions = {
        visible: false,
        immersive: true,
        title: currentPage.navigationBar?.title || '',
        backIcon: currentPage.navigationBar?.backIcon || 'none'
      };

      apisAsync.setNavigationBar(navOptions);
      updateNavBar(currentPage.navigationBar || { visible: false, title: '', backIcon: 'none' });
    }
  }, [isActive, pageLocation.pathname, updateNavBar, currentPage]);

  return (
    <div
      className="app-layout"
      style={{
        pointerEvents: isTransitioning ? 'none' : 'auto',
        background: '#ffffff' // Auth thường nền trắng
      }}
    >
      <main className="app-main">
        {children}
      </main>
    </div>
  );
};

export default React.memo(AuthLayout);
