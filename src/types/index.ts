/**
 * @file types/index.ts
 * @description Tập trung các TypeScript type definitions dùng chung trong toàn bộ ứng dụng.
 */

// ─────────────────────────────────────────────────────────────────────────────
// API Debugger Types
// ─────────────────────────────────────────────────────────────────────────────

/** Đại diện cho một API entry trong debugger */
export interface ApiEntry {
  /** ID duy nhất, dùng để track log & loading state */
  id: string;
  /** Tên hàm hiển thị */
  name: string;
  /** Mô tả ngắn về chức năng */
  desc: string;
  /** Tham số mặc định hoặc gợi ý (JSON string) */
  params?: string;
  /** Hàm thực thi gọi API, trả về Promise */
  fn: (params?: any) => Promise<any>;
}

/** Nhóm các API liên quan */
export interface ApiGroup {
  /** Tên nhóm hiển thị */
  name: string;
  /** Danh sách các API trong nhóm */
  apis: ApiEntry[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation Types
// ─────────────────────────────────────────────────────────────────────────────

/** Cấu hình một tab trong bottom navigation */
export interface NavTab {
  /** Đường dẫn route */
  path: string;
  /** Nhãn hiển thị */
  label: string;
  /** SVG path content */
  icon: React.ReactNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// App Info Types
// ─────────────────────────────────────────────────────────────────────────────

/** Thông tin phiên bản ứng dụng */
export interface AppInfo {
  label: string;
  value: string;
}
