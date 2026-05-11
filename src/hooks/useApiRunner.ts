/**
 * @file hooks/useApiRunner.ts
 * @description Custom hook xử lý logic chạy API, quản lý trạng thái loading,
 * ghi log kết quả và xử lý ảnh preview. Giúp tách biệt logic khỏi UI component.
 */

import { useState, useCallback, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/** Trạng thái log cho từng API, được index bằng API id */
type LogState = Record<string, string>;

/** Danh sách ảnh/video preview, được index bằng API id */
export type PreviewItem = { type: 'image' | 'video'; src: string; size?: number };
type PreviewState = Record<string, PreviewItem[]>;

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hook cung cấp:
 * - `logs`: Lịch sử kết quả thực thi cho từng API
 * - `previews`: Ảnh preview nếu API trả về `tempFiles`
 * - `loading`: ID của API đang chạy (null nếu không có)
 * - `run(id, fn)`: Hàm thực thi một API entry và cập nhật logs
 * - `clearLog(id)`: Xóa log của một API cụ thể
 */
export function useApiRunner() {
  const [logs, setLogs] = useState<LogState>({});
  const [previews, setPreviews] = useState<PreviewState>({});
  const [loading, setLoading] = useState<string | null>(null);

  /**
   * Lắng nghe sự kiện từ Native (chủ động đẩy từ Flutter)
   */
  useEffect(() => {
    const handleNativeEvent = (e: any) => {
      const { eventName, data } = e.detail;
      const timestamp = new Date().toLocaleTimeString('vi-VN');

      if (eventName === 'native_log') {
        const { level, message, data: extraData } = data;
        const icon = level === 'error' ? '❌' : level === 'warn' ? '⚠️' : '📱';
        const logContent = `[${timestamp}] ${icon} NATIVE LOG:\n${message}${extraData ? '\nData: ' + JSON.stringify(extraData, null, 2) : ''}`;

        setLogs((prev) => ({
          ...prev,
          // Lưu vào một key đặc biệt dành cho log từ native
          native_log: (prev.native_log ? prev.native_log + '\n\n' : '') + logContent,
        }));
      }
    };

    window.addEventListener('ejsc:native-event', handleNativeEvent);
    return () => window.removeEventListener('ejsc:native-event', handleNativeEvent);
  }, []);

  /**
   * Thực thi một hàm API bất đồng bộ và cập nhật state.
   * @param id - ID duy nhất của API entry
   * @param fn - Hàm async trả về Promise
   */
  const run = useCallback(async (id: string, fn: () => Promise<any>) => {
    // Không cho chạy đồng thời nhiều API
    if (loading !== null) return;

    setLoading(id);
    const timestamp = new Date().toLocaleTimeString('vi-VN');

    try {
      const res = await fn();

      // Format kết quả thành JSON cho dễ đọc
      let formatted = JSON.stringify(res, null, 2);

      // Truncate long base64 strings (longer than 100 chars) for UI cleanliness
      formatted = formatted.replace(/"(data:image\/[^;]+;base64,)?([^"]{100,})"/g, (match, prefix, content) => {
        const p = prefix || '';
        const c = content as string;
        return `"${p}${c.substring(0, 30)}...[truncated]...${c.substring(c.length - 20)}"`;
      });

      setLogs((prev) => ({
        ...prev,
        [id]: `[${timestamp}] ✅ SUCCESS:\n${formatted}`,
      }));

      // Trích xuất ảnh/video preview từ các trường trả về phổ biến
      const previewItems: PreviewItem[] = [
        ...(res?.tempFiles?.map((f: any) => {
          const isVideo = f.fileType === 'video' || (f.path && f.path.match(/\.(mp4|mov|avi)$/i));

          let src = '';
          if (f.base64) {
            src = f.base64.startsWith('data:') ? f.base64 : `data:image/jpeg;base64,${f.base64}`;
          } else {
            src = f.path || f.tempFilePath;
          }

          return {
            type: isVideo ? 'video' : 'image',
            src,
            size: f.size
          } as PreviewItem;
        }) || []),
      ].filter(item => typeof item.src === 'string' && (item.src.startsWith('data:') || item.src.startsWith('http') || item.src.startsWith('/')));

      if (previewItems.length > 0) {
        setPreviews((prev) => ({ ...prev, [id]: previewItems }));
      }

      return res;
    } catch (error: any) {
      // Normalize lỗi sang dạng string hoặc JSON
      const errMessage =
        typeof error === 'string'
          ? error
          : (error?.message || (error && Object.keys(error).length > 0 ? JSON.stringify(error, null, 2) : error?.toString() || 'Unknown Error'));

      setLogs((prev) => ({
        ...prev,
        [id]: `[${timestamp}] ❌ ERROR:\n${errMessage}`,
      }));
    } finally {
      setLoading(null);
    }
  }, [loading]);

  /**
   * Xóa log và preview của một API cụ thể.
   * @param id - ID của API entry cần xóa
   */
  const clearLog = useCallback((id: string) => {
    setLogs((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setPreviews((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  return { logs, previews, loading, run, clearLog };
}
