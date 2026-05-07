/**
 * @file hooks/useLogRelay.ts
 * @description Custom hook điều khiển trạng thái Log Relay và giao tiếp với Simulator/IDE.
 */

import { useEffect } from 'react';

export interface UseLogRelayOptions {
  enableSocketLog?: boolean;
}

/**
 * Hook quản lý việc truyền log và điều khiển hiển thị Log Panel.
 * @param options - Cấu hình devTool
 */
export function useLogRelay(options?: UseLogRelayOptions) {
  const isLogEnabled = options?.enableSocketLog !== false;

  useEffect(() => {
    window.__EJSC_LOG_RELAY_ENABLED__ = isLogEnabled;

    if (isLogEnabled) {
      window.parent.postMessage({ type: 'SHOW_LOG_PANEL' }, '*');
    } else {
      window.parent.postMessage({ type: 'HIDE_LOG_PANEL' }, '*');
    }
  }, [isLogEnabled]);

  return { isLogEnabled };
}
