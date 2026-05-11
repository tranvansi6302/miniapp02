/**
 * @file navigation/index.tsx
 * @description Quản lý luồng điều hướng tập trung của ứng dụng.
 */
import React from 'react';
import { Link, type IRouterConfig } from 'ejsc-ma-router';
import type { BackIconType } from 'ejsc-ma-component';
import { SimulatorAppHeader } from 'ejsc-ma-component';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Import Screens
import HomeScreen from '../screens/Home'; // Giữ nguyên, không xóa
import DeepLinkHomeScreen from '../screens/Home/DeepLinkHomeScreen';
import ServicesScreen from '../screens/Services';
import ApiScreen from '../screens/Activities/ApiScreen';
import BookingScreen from '../screens/Booking';
import DebuggerScreen from '../screens/Activities/DebuggerScreen';
import AccountScreen from '../screens/Account';
import LoginScreen, { RegisterScreen, OtpScreen } from '../screens/Auth';
import AboutScreen from '../screens/About';

export type AnimationType = 'none' | 'slide_left' | 'slide_up' | 'fade_in';

/** Cấu hình các trang trong ứng dụng */
const pages = [
  {
    pathname: '/',
    Component: DeepLinkHomeScreen, // HomeScreen cũ được giữ nguyên không xóa
    animation: 'none',
    showAppBar: false,
    customHeader: () => null
  },
  {
    pathname: '/services',
    Component: ServicesScreen,
    animation: 'slide_left',
    showAppBar: false,
    customHeader: () => null,
    title: 'Dịch vụ'
  },
  {
    pathname: '/api',
    Component: ApiScreen,
    animation: 'slide_left',
    showAppBar: false,
    customHeader: () => null,
    title: 'Bridge APIs'
  },
  {
    pathname: '/booking',
    Component: BookingScreen,
    animation: 'slide_up',
    showAppBar: false,
    customHeader: () => null,
    title: 'Đặt lịch'
  },
  {
    pathname: '/activities',
    Component: DebuggerScreen,
    animation: 'slide_left',
    showAppBar: false,
    customHeader: () => null,
    title: 'Link'
  },
  {
    pathname: '/account',
    Component: AccountScreen,
    animation: 'slide_left',
    showAppBar: false,
    customHeader: () => null,
    title: 'Tài khoản'
  },
  {
    pathname: '/login',
    Component: LoginScreen,
    animation: 'slide_left',
    showAppBar: false,
    showBottomNav: false,
    customHeader: () => null,
    Layouts: [AuthLayout]
  },
  {
    pathname: '/register',
    Component: RegisterScreen,
    animation: 'slide_left',
    showAppBar: false,
    showBottomNav: false,
    customHeader: () => null,
    Layouts: [AuthLayout]
  },
  {
    pathname: '/verify-otp',
    Component: OtpScreen,
    animation: 'slide_left',
    showAppBar: false,
    showBottomNav: false,
    customHeader: () => null,
    Layouts: [AuthLayout]
  },
  {
    pathname: '/about',
    Component: AboutScreen,
    animation: 'slide_left',
    title: 'Thông tin',
    backIcon: 'arrow' as BackIconType
  },
];

/** Cấu hình Router SDK */
export const appRouterConfig: IRouterConfig = {
  pages: pages.map(p => ({
    pathname: p.pathname,
    Component: p.Component,
    headerComponent: p.customHeader,
    Layouts: p.Layouts || [MainLayout],
    navigationBar: {
      title: p.title,
      backIcon: p.backIcon || 'none',
      visible: p.showAppBar !== false
    },
    animation: {
      type: p.animation as AnimationType
    }
  })),
  Layouts: [],

  headerComponent: SimulatorAppHeader,
  NotFoundPage: () => (
    <div className="page-content flex flex-col items-center justify-center p-10 text-center">
      <h1 className="text-[64px] font-black text-gray-200 m-0">404</h1>
      <p className="text-gray-500 mb-8">Trang này hiện không khả dụng hoặc đã bị di dời.</p>
      <Link
        to="/"
        className="bg-ejsc-brand text-white px-6 py-3 rounded-2xl font-bold no-underline active:scale-95 transition-transform"
      >
        Quay lại trang chủ
      </Link>
    </div>
  ),
  animation: { mode: 'framer-motion', type: 'slide_left' },
  keepAlive: { enable: true, maxStack: 10 },
};

/** Cấu hình Bottom Tab Bar */
export const bottomTabBarConfig = {
  items: [
    { id: 'home', name: 'Trang chủ', path: '/', icon: 'home' },
    { id: 'api', name: 'API', path: '/api', icon: 'code' },
    { id: 'booking', name: 'Đặt lịch', path: '/booking', icon: 'calendar' },
    { id: 'debugger', name: 'Liên kết', path: '/activities', icon: 'link' },
    { id: 'account', name: 'Tài khoản', path: '/account', icon: 'user' },
  ]
};
