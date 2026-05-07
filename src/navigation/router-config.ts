/**
 * @file router-config.ts
 * @description Cấu hình Router tinh giản bao gồm HomeScreen và các trang khác.
 */
import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import BookingScreen from '../screens/BookingScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import AccountScreen from '../screens/AccountScreen';
import LoginScreen from '../screens/LoginScreen';
import React from 'react';

export type AnimationType = 'none' | 'slide_left' | 'slide_up' | 'fade_in';

/** Cấu hình cho AppBar Native */
export interface INativeAppBar {
  type: 'native';
  title: string;
  backIcon?: 'arrow' | 'none';
  backgroundColor?: string;
  textColor?: string;
}

/** Cấu hình cho AppBar Custom */
export interface ICustomAppBar {
  type: 'custom';
  Component?: React.ComponentType<any>;
}

export type AppBarConfig = INativeAppBar | ICustomAppBar;

export interface IRouterPageConfig {
  pathname: string;
  Component: React.ComponentType<any>;
  animation: AnimationType;
  appBar: AppBarConfig;
  showAppBar?: boolean;
  showBottomNav?: boolean;
}

export interface IRouterConfig {
  pages: IRouterPageConfig[];
  bottomTabBar: {
    items: { id: string; name: string; path: string; icon: string }[];
  };
}

export const getRouterConfig = (): IRouterConfig => ({
  pages: [
    {
      pathname: '/',
      Component: HomeScreen,
      animation: 'none',
      appBar: { type: 'custom' },
      showAppBar: false
    },
    {
      pathname: '/services',
      Component: ServicesScreen,
      animation: 'slide_left',
      appBar: { type: 'native', title: 'Dịch vụ', backIcon: 'none' }
    },
    {
      pathname: '/booking',
      Component: BookingScreen,
      animation: 'slide_up',
      appBar: { type: 'native', title: 'Đặt lịch', backIcon: 'none' }
    },
    {
      pathname: '/activities',
      Component: ActivitiesScreen,
      animation: 'slide_left',
      appBar: { type: 'native', title: 'Hoạt động', backIcon: 'none' }
    },
    {
      pathname: '/account',
      Component: AccountScreen,
      animation: 'slide_left',
      appBar: { type: 'native', title: 'Tài khoản', backIcon: 'none' }
    },
    {
      pathname: '/login',
      Component: LoginScreen,
      animation: 'slide_left',
      appBar: { type: 'custom' },
      showAppBar: false,
      showBottomNav: false
    },
  ],
  bottomTabBar: {
    items: [
      { id: 'home', name: 'Trang chủ', path: '/', icon: 'home' },
      { id: 'services', name: 'Dịch vụ', path: '/services', icon: 'grid' },
      { id: 'booking', name: 'Đặt lịch', path: '/booking', icon: 'calendar' },
      { id: 'activities', name: 'Hoạt động', path: '/activities', icon: 'history' },
      { id: 'account', name: 'Tài khoản', path: '/account', icon: 'user' },
    ]
  }
});
