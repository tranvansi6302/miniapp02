/**
 * @file navigation/appRouterConfig.tsx
 * @description Cấu hình chi tiết cho Router bao gồm mapping pages, layouts và trang 404.
 */
import { Link, type IRouterConfig } from 'ejsc-ma-router';
import type { BackIconType } from 'ejsc-ma-component';
import { SimulatorAppHeader } from 'ejsc-ma-component';
import MainLayout from '../layouts/MainLayout';
import type { AnimationType } from './router-config';
import { getRouterConfig } from './router-config';

const routerConfigData = getRouterConfig();

/**
 * appRouterConfig - Đối tượng cấu hình chính cho Router.
 * Chuyển đổi từ dữ liệu router-config đơn giản sang định dạng Router SDK yêu cầu.
 */
export const appRouterConfig: IRouterConfig = {
  pages: routerConfigData.pages.map(p => ({
    pathname: p.pathname,
    Component: p.Component,
    // Xử lý Component Header tùy chỉnh nếu có
    headerComponent: p.appBar.type === 'custom' ? p.appBar.Component : (p.pathname === '/' ? () => null : undefined),
    navigationBar: {
      title: p.appBar.type === 'native' ? p.appBar.title : undefined,
      backIcon: p.appBar.type === 'native' ? (p.appBar.backIcon as BackIconType) : 'none',
      visible: p.showAppBar !== false
    },
    animation: {
      type: p.animation as AnimationType
    }
  })),
  Layouts: [MainLayout],
  headerComponent: SimulatorAppHeader,

  /** Trang hiển thị khi không tìm thấy đường dẫn */
  NotFoundPage: () => (
    <div className="page-content flex flex-col items-center justify-center p-10 text-center">
      <h1 className="text-[64px] font-black text-gray-200 m-0">404</h1>
      <p className="text-gray-500 mb-8">Trang này hiện không khả dụng hoặc đã bị di dời.</p>
      <Link
        to="/"
        className="bg-alias-background-brand text-white px-6 py-3 rounded-2xl font-bold no-underline active:scale-95 transition-transform"
      >
        Quay lại trang chủ
      </Link>
    </div>
  ),

  // Cấu hình Animation mặc định toàn cục
  animation: { mode: 'framer-motion', type: 'slide_left' },
  // Cấu hình giữ trạng thái trang (Stack Management)
  keepAlive: { enable: true, maxStack: 10 },
};
