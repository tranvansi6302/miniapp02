/**
 * @file locales/api-error-messages.ts
 * @description File này dùng để ánh xạ các mã lỗi (Error Codes) trả về từ API sang các Key ngôn ngữ tương ứng.
 * Chỉ sử dụng file này cho các thông báo lỗi từ Server (Toast error). Các nội dung khác dùng component <Lang />.
 */

const baseApiErrors: Record<string, { key: string; fallback: string }> = {
  AN_UNEXPECTED_ERROR_OCCURRED: { key: 'hb-w-login-error-general', fallback: 'Có lỗi xảy ra, vui lòng thử lại sau' },
  ERR_INTERNAL_SERVER: { key: 'hb-w-login-error-general', fallback: 'Lỗi hệ thống, vui lòng liên hệ kỹ thuật' },
  ERR_USER_ACCOUNT_INVALID_CREDENTIALS: { key: 'hb-w-login-error-invalid', fallback: 'Thông tin đăng nhập không chính xác' },
  ERR_USER_ACCOUNT_NOT_FOUND: { key: 'hb-w-login-error-invalid', fallback: 'Tài khoản không tồn tại' },
  ERR_USER_ACCOUNT_TEL_NOT_FOUND: { key: 'hb-w-login-error-invalid', fallback: 'Số điện thoại chưa được đăng ký' },
  ERR_USER_ACCOUNT_INVALID_OTP: { key: 'hb-w-login-error-invalid', fallback: 'Mã xác thực không chính xác' },
  ERR_INVALID_TOKEN: { key: 'hb-w-login-error-general', fallback: 'Phiên đăng nhập hết hạn' },
  ERR_REFRESH_TOKEN_EXPIRED: { key: 'hb-w-login-error-general', fallback: 'Vui lòng đăng nhập lại' },
};

/**
 * Proxy giúp xử lý các mã lỗi chưa được định nghĩa.
 * Nếu API trả về một mã lỗi lạ, nó sẽ dùng chính mã đó làm Key và Fallback để dễ debug.
 */
export const API_ERROR_MESSAGES = new Proxy(baseApiErrors, {
  get: (target, prop: string) => {
    return target[prop] || { key: prop, fallback: prop };
  }
});
