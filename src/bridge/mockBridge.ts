/**
 * @file mockBridge.ts
 * @description Cung cấp Smart Bridge (window.ejsc) cho môi trường phát triển.
 *
 * Tùy thuộc vào môi trường chạy, nó sẽ:
 * 1. Gửi qua Native Bridge (window.EjscBridge) nếu chạy trên thiết bị thật.
 * 2. Gửi qua postMessage cho Simulator nếu chạy trong iframe.
 * 3. Sử dụng dữ liệu Mock nếu chạy trực tiếp trên trình duyệt Web thông thường.
 *
 * ─── Lưu ý ───────────────────────────────────────────────────────────────────
 * Logic WebSocket Log Relay và Navigation Sync đã được chuyển sang CLI.
 * Khi chạy `pnpm dev`, CLI sẽ tự động inject `/__ejsc_dev_client__.js` vào
 * <head> của index.html để xử lý các chức năng đó.
 * Xem: ejsc-ma-clis/src/assets/dev-client.js
 * ─────────────────────────────────────────────────────────────────────────────
 */

const pendingCallbacks = new Map<string, { success?: Function; fail?: Function; complete?: Function }>();

if (typeof window !== 'undefined') {
  // Lắng nghe phản hồi từ Simulator
  window.addEventListener('message', (event) => {
    const { data } = event;
    if (data?.type === 'EJSC_BRIDGE_RESPONSE') {
      const { callbackId, result, error } = data;
      const cb = pendingCallbacks.get(callbackId);
      if (cb) {
        if (error) {
          cb.fail?.({ message: error });
        } else {
          cb.success?.(result);
        }
        cb.complete?.();
        pendingCallbacks.delete(callbackId);
      }
    }

    if (data?.type === 'EJSC_SAFE_AREA_UPDATE') {
      const { top, bottom, left, right, fontSizeScale, isRealDevice } = data;
      
      const root = document.documentElement;
      root.style.setProperty('--safe-area-inset-top', `${top}px`);
      root.style.setProperty('--safe-area-inset-bottom', `${bottom}px`);
      root.style.setProperty('--safe-area-inset-left', `${left}px`);
      root.style.setProperty('--safe-area-inset-right', `${right}px`);
      root.style.setProperty('--is-real-device', isRealDevice ? '1' : '0');
      root.style.setProperty('--device-border-radius', `${data.borderRadius || 0}px`);
      
      if (fontSizeScale) {
        root.style.zoom = fontSizeScale.toString();
      }
    }
  });
}

// Map lưu các callback chờ phản hồi từ Flutter Native
let flutterCallbackId = 0;
const flutterCallbacks = new Map<number, { success?: Function; fail?: Function; complete?: Function }>();

/**
 * Tạo wrapper thông minh cho API Bridge
 */
function createBridgeMethod(apiName: string, localMockFn: Function, action?: string) {
  return (...args: any[]) => {
    const opts = args[args.length - 1] || {};
    const { success, fail, complete, ...rest } = typeof opts === 'object' ? opts : {};

    const flutterBridge = typeof window !== 'undefined' ? window.EjscBridge : null;
    const isInIframe = typeof window !== 'undefined' && window.parent !== window;

    let finalParams = rest;
    if (action) {
      finalParams = { ...rest, action };
    }

    if (flutterBridge && typeof flutterBridge.postMessage === 'function') {
      // 1. Thiết bị thật (Flutter WebView)
      console.info(`[Bridge] Forwarding to Flutter Native: ${apiName}`, finalParams);
      const id = flutterCallbackId++;
      flutterCallbacks.set(id, { success, fail, complete });

      flutterBridge.postMessage(JSON.stringify({
        method: apiName,
        id,
        params: finalParams
      }));
    } else if (isInIframe) {
      // 2. Simulator (iframe)
      console.info(`[Bridge] Forwarding to Simulator: ${apiName}`, finalParams);
      const callbackId = `${apiName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      pendingCallbacks.set(callbackId, { success, fail, complete });

      window.parent.postMessage({
        type: 'EJSC_BRIDGE_REQUEST',
        method: apiName,
        args: finalParams,
        callbackId
      }, '*');
    } else {
      // 3. Trình duyệt Web thông thường (Mock Mode)
      console.info(`[Bridge] Using Mock Data: ${apiName}`);
      return localMockFn(...args);
    }
  };
}

if (typeof window !== 'undefined') {
  // Khởi tạo nếu chưa có
  if (!window.ejsc) {
    window.ejsc = {};
  }

  const ejsc = window.ejsc;

  // Cơ chế nhận phản hồi từ Flutter Native
  ejsc._onNativeResponse = (id: number, res: any) => {
    console.info(`[NativeBridge] Response for id: ${id}`, res);
    const cb = flutterCallbacks.get(id);
    if (cb) {
      if (res?.error) {
        cb.fail?.(res.error);
      } else {
        let finalData = res.data;
        // Chuẩn hóa chooseImage: tempFilePaths -> filePaths, base64 -> data
        if (finalData && finalData.tempFilePaths && !finalData.filePaths) {
          finalData.filePaths = finalData.tempFilePaths;
        }
        if (finalData && finalData.tempFiles) {
          finalData.tempFiles = finalData.tempFiles.map((f: any) => ({
            ...f,
            data: f.base64 || f.data
          }));
        }
        cb.success?.(finalData);
      }
      cb.complete?.();
      flutterCallbacks.delete(id);
    }
  };

  /**
   * Cơ chế nhận sự kiện chủ động từ Native
   */
  ejsc._onNativeEvent = (eventName: string, data: any) => {
    // Relay lên dev-client.js (được CLI inject) để browser PC nhận được
    const relayFn = window.__ejsc_relay;
    if (typeof relayFn === 'function' && window.__EJSC_LOG_RELAY_ENABLED__ !== false) {
      relayFn(eventName, data);
    }

    // Xử lý riêng cho log để đẩy thẳng vào Web Console (nếu đang inspect WebView)
    if (eventName === 'native_log') {
      const { level, message, data: extraData } = data;
      const styles = {
        info: 'color: #1677ff; font-weight: bold;',
        warn: 'color: #faad14; font-weight: bold;',
        error: 'color: #f5222d; font-weight: bold;'
      };
      const label = `[Native ${level.toUpperCase()}]`;

      if (extraData) {
        console.groupCollapsed(`%c${label} ${message}`, (styles as any)[level] || styles.info);
        console.dir(extraData);
        console.groupEnd();
      } else {
        console.log(`%c${label} ${message}`, (styles as any)[level] || styles.info);
      }
    } else {
      console.info(`[NativeEvent] ${eventName}`, data);
    }

    // Phát sự kiện để UI có thể hiển thị nếu cần
    const event = new CustomEvent('ejsc:native-event', {
      detail: { eventName, data }
    });
    window.dispatchEvent(event);
  };

  // Định nghĩa các phương thức API
  Object.assign(ejsc, {
    getSystemInfo: createBridgeMethod('getSystemInfo', (opts: any) =>
      opts.success?.({ model: 'Mock Device', system: 'Browser', version: '1.0.0' })),
    exitMiniApp: createBridgeMethod('exitMiniApp', (_opts: any) =>
      window.alert('[MockBridge] exitMiniApp called')),
    confirmBeforeExit: createBridgeMethod('confirmBeforeExit', (opts: any) =>
      opts.success?.({ confirm: window.confirm(opts.content ?? 'Thoát?') })),

    // Settings / Permissions
    getSetting: createBridgeMethod('getSetting', (opts: any) =>
      opts.success?.({ authSetting: { 'scope.camera': true, 'scope.userLocation': true } })),
    authorize: createBridgeMethod('authorize', (opts: any) =>
      opts.success?.({ status: 'authorized' })),
    openSetting: createBridgeMethod('openSetting', (opts: any) =>
      opts.success?.({})),
    openAppSetting: createBridgeMethod('openAppSetting', (opts: any) =>
      opts.success?.({})),
    openNativeStore: createBridgeMethod('openNativeStore', (opts: any) =>
      opts.success?.({})),

    // Location
    getLocation: createBridgeMethod('getLocation', (opts: any) =>
      opts.success?.({ latitude: 10.7626, longitude: 106.6602 })),

    // Media
    chooseImage: createBridgeMethod('chooseImage', (opts: any) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event: any) => {
            const base64 = event.target.result;
            opts.success?.({ filePaths: [base64], tempFilePaths: [base64] });
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }),
    chooseMedia: createBridgeMethod('chooseMedia', (opts: any) =>
      opts.success?.({ tempFiles: [{ tempFilePath: 'https://picsum.photos/200' }] })),
    previewImage: createBridgeMethod('previewImage', (opts: any) =>
      opts.success?.({})),
    saveImage: createBridgeMethod('saveImage', (opts: any) =>
      opts.success?.({ success: true })),
    compressImage: createBridgeMethod('compressImage', (opts: any) =>
      opts.success?.({ tempFilePath: opts.src, size: 12345 })),
    getImageInfo: createBridgeMethod('getImageInfo', (opts: any) =>
      opts.success?.({ width: 100, height: 100, path: opts.src, orientation: 'up', type: 'png' })),

    getAppLanguage: createBridgeMethod('getAppLanguage', (opts: any) =>
      opts.success?.({ language: 'vi' })),
    getUserInfo: createBridgeMethod('getUserInfo', (opts: any) =>
      opts.success?.({
        isLoggedIn: true,
        id: 'user_001',
        fullName: 'Nguyễn Văn A',
        email: 'vn@gmai.com',
        avatarUrl: null,
        phone: null
      })),
    // Clipboard
    setClipboard: createBridgeMethod('setClipboard', (opts: any) => opts.success?.({})),
    getClipboard: createBridgeMethod('getClipboard', (opts: any) => opts.success?.({ text: 'Mocked clipboard text' })),

    // Storage
    _store: {} as Record<string, any>,
    setStorage: createBridgeMethod('setStorage', (opts: any) => {
      if (!ejsc._store) ejsc._store = {};
      ejsc._store[opts.key] = opts.data;
      opts.success?.({});
    }),
    getStorage: createBridgeMethod('getStorage', (opts: any) => {
      if (!ejsc._store) ejsc._store = {};
      opts.success?.({ data: ejsc._store[opts.key] ?? null });
    }),
    removeStorage: createBridgeMethod('removeStorage', (opts: any) => {
      if (!ejsc._store) ejsc._store = {};
      delete ejsc._store[opts.key];
      opts.success?.({});
    }),
    clearStorage: createBridgeMethod('clearStorage', (opts: any) => {
      ejsc._store = {};
      opts.success?.({});
    }),
    getStorageInfo: createBridgeMethod('getStorageInfo', (opts: any) => {
      if (!ejsc._store) ejsc._store = {};
      opts.success?.({ keys: Object.keys(ejsc._store), currentSize: 0, limitSize: 10240 });
    }),

    // Network
    request: createBridgeMethod('request', (opts: any) => {
      fetch(opts.url, { method: opts.method ?? 'GET' })
        .then(r => r.json())
        .then(data => opts.success?.({ data, statusCode: 200 }))
        .catch(err => opts.fail?.({ message: err.message }));
    }),
    downloadFile: createBridgeMethod('downloadFile', (opts: any) =>
      opts.success?.({ filePath: '/mock/download/' + Date.now() })),
    uploadFile: createBridgeMethod('uploadFile', (opts: any) =>
      opts.success?.({ data: '{}', statusCode: 200 })),

    // UI
    showToast: createBridgeMethod('showToast', (opts: any) => {
      console.info('[Toast]', opts.content);
      opts.success?.({});
    }),
    alert: createBridgeMethod('alert', (opts: any) => {
      window.alert(`${opts.title ?? ''}\n\n${opts.content}`);
      opts.success?.({});
    }),
    confirm: createBridgeMethod('confirm', (opts: any) => {
      const result = window.confirm(opts.content);
      result ? opts.success?.({ confirm: true }) : opts.fail?.({ confirm: false });
    }),
    prompt: createBridgeMethod('prompt', (opts: any) => {
      const value = window.prompt(opts.title ?? '', opts.defaultValue ?? '');
      value !== null ? opts.success?.({ value }) : opts.fail?.({});
    }),
    showActionSheet: createBridgeMethod('showActionSheet', (opts: any) => {
      const items = (opts.items as string[]) ?? [];
      const choice = window.prompt(
        opts.title ? `[${opts.title}]\n` + items.map((it, i) => `${i}: ${it}`).join('\n') : items.join(', ')
      );
      opts.success?.({ index: parseInt(choice ?? '-1'), tapIndex: parseInt(choice ?? '-1') });
    }),
    showLoading: createBridgeMethod('showLoading', (opts: any) => {
      console.info('[Loading]', opts.content);
      opts.success?.({});
    }),
    hideLoading: createBridgeMethod('hideLoading', (opts: any) => opts.success?.({})),

    // Scan
    scan: createBridgeMethod('scan', (opts: any) =>
      opts.success?.('MOCK-QR-DATA')),

    // Navigation
    setNavigationBar: createBridgeMethod('setNavigationBar', (opts: any) => {
      if (opts.title) document.title = opts.title;
      window.dispatchEvent(new CustomEvent('mock:setNavigationBar', { detail: opts }));
      opts.success?.({});
    }),
    openDeeplink: createBridgeMethod('openDeeplink', (opts: any) => {
      console.info('[Deeplink]', opts.url);
      opts.success?.({});
    }),
    openPublicDeepLink: createBridgeMethod('openPublicDeepLink', (opts: any) => {
      window.open(opts.url, '_blank');
      opts.success?.({});
    }),
    shareApp: createBridgeMethod('shareApp', (opts: any) => {
      if (navigator.share) {
        navigator.share({ title: opts.title, text: opts.desc, url: opts.imageUrl });
      }
      opts.success?.({});
    }),

    // Biometric
    bioMetrics: {
      isSupported: createBridgeMethod('bioMetrics', (opts: any) => opts.success?.({}), 'isSupported'),
      localAuth: createBridgeMethod('bioMetrics', (opts: any) => opts.success?.({}), 'localAuth'),
      keyExists: createBridgeMethod('bioMetrics', (opts: any) => opts.success?.({}), 'keyExists'),
      createKey: createBridgeMethod('bioMetrics', (opts: any) => opts.success?.({}), 'createKey'),
      createSignature: createBridgeMethod('bioMetrics', (opts: any) => opts.success?.({}), 'createSignature'),
      deleteKey: createBridgeMethod('bioMetrics', (opts: any) => opts.success?.({}), 'deleteKey'),
    }
  });
}
