/**
 * @file constants/apiGroups.ts
 * @description Định nghĩa tất cả các nhóm API cho Bridge API Debugger.
 * Copied from my-app-host for miniapp-02.
 */

import { apisAsync } from 'ejsc-ma-api';
import type { ApiGroup } from '~/types';

export const API_GROUPS: ApiGroup[] = [
  {
    name: 'System',
    apis: [
      {
        id: 'getSystemInfo',
        name: 'getSystemInfo',
        desc: 'Thông tin thiết bị & hệ điều hành.',
        fn: () => apisAsync.getSystemInfo(),
      },
      {
        id: 'exitMiniApp',
        name: 'exitMiniApp',
        desc: 'Thoát Mini App.',
        fn: () => apisAsync.exitMiniApp(),
      },
      {
        id: 'triggerHapticFeedback',
        name: 'hapticFeedback',
        desc: 'Rung phản hồi.',
        params: JSON.stringify({ style: 'success' }, null, 2),
        fn: (p) => apisAsync.triggerHapticFeedback(p),
      },
    ],
  },
  {
    name: 'UI & Dialogs',
    apis: [
      {
        id: 'setNavigationBar',
        name: 'setNavigationBar',
        desc: 'Tùy chỉnh thanh điều hướng.',
        params: JSON.stringify({ title: 'Mini App 02', backgroundColor: '#1A73E8', frontColor: '#ffffff' }, null, 2),
        fn: (p) => apisAsync.setNavigationBar(p),
      },
      {
        id: 'showToast',
        name: 'showToast',
        desc: 'Thông báo Toast.',
        params: JSON.stringify({ content: 'Thành công!', type: 'success', duration: 3000 }, null, 2),
        fn: (p) => apisAsync.showToast(p),
      },
      {
        id: 'alert',
        name: 'alert',
        desc: 'Hộp thoại thông báo.',
        params: JSON.stringify({ title: 'Bridge Test', content: 'Nội dung thông báo' }, null, 2),
        fn: (p) => apisAsync.alert(p),
      },
      {
        id: 'confirm',
        name: 'confirm',
        desc: 'Hộp thoại xác nhận.',
        params: JSON.stringify({ title: 'Xác nhận', content: 'Bạn có chắc chắn?', confirmButtonText: 'Có', cancelButtonText: 'Không' }, null, 2),
        fn: (p) => apisAsync.confirm(p),
      },
      {
        id: 'showLoading',
        name: 'showLoading / hideLoading',
        desc: 'Hiện spinner trong 2 giây.',
        fn: async () => {
          await apisAsync.showLoading({ content: 'Đang tải...' });
          await new Promise(r => setTimeout(r, 2000));
          return apisAsync.hideLoading();
        },
      },
    ],
  },
  {
    name: 'Navigation & Links',
    apis: [
      {
        id: 'openDeeplink',
        name: 'openDeeplink',
        desc: 'Mở Mini App khác.',
        params: JSON.stringify({ url: 'ejsc://mini-apps/mini-app-1', title: 'Mini App 1' }, null, 2),
        fn: (p) => apisAsync.openDeeplink(p),
      },
      {
        id: 'openPublicDeepLink',
        name: 'openPublicDeepLink',
        desc: 'Mở URL bằng browser máy.',
        params: JSON.stringify({ url: 'https://google.com' }, null, 2),
        fn: (p) => apisAsync.openPublicDeepLink(p),
      },
      {
        id: 'openInAppBrowser',
        name: 'openInAppBrowser',
        desc: 'Mở trình duyệt trong app.',
        params: JSON.stringify({ url: 'https://365teams.vn' }, null, 2),
        fn: (p) => apisAsync.openInAppBrowser(p),
      },
    ],
  },
  {
    name: 'Storage & Data',
    apis: [
      {
        id: 'setStorage',
        name: 'setStorage',
        desc: 'Lưu dữ liệu.',
        params: JSON.stringify({ key: 'test', data: 'Hello' }, null, 2),
        fn: (p) => apisAsync.setStorage(p),
      },
      {
        id: 'getStorage',
        name: 'getStorage',
        desc: 'Đọc dữ liệu.',
        params: JSON.stringify({ key: 'test' }, null, 2),
        fn: (p) => apisAsync.getStorage(p),
      },
      {
        id: 'getUserInfo',
        name: 'getUserInfo',
        desc: 'Thông tin người dùng.',
        fn: () => apisAsync.getUserInfo(),
      },
    ],
  },
  {
    name: 'Location & Device',
    apis: [
      {
        id: 'getUserLocation',
        name: 'getUserLocation',
        desc: 'Tọa độ & Địa chỉ chi tiết.',
        params: JSON.stringify({ enableHighAccuracy: true }, null, 2),
        fn: (p) => apisAsync.getUserLocation(p),
      },
      {
        id: 'scan',
        name: 'scanQR',
        desc: 'Quét mã QR.',
        fn: () => apisAsync.scan(),
      },
      {
        id: 'setClipboard',
        name: 'setClipboard',
        desc: 'Copy văn bản.',
        params: JSON.stringify({ text: 'Hello EJSC' }, null, 2),
        fn: (p) => apisAsync.setClipboard(p),
      },
    ],
  },
];
