/**
 * @file locales/api-error-messages.ts
 * @description File này dùng để ánh xạ các mã lỗi (Error Codes) trả về từ API sang các Key ngôn ngữ tương ứng.
 * Chỉ sử dụng file này cho các thông báo lỗi từ Server (Toast error). Các nội dung khác dùng component <Lang />.
 */

const baseApiErrors: Record<string, { key: string }> = {
  AN_UNEXPECTED_ERROR_OCCURRED: { key: 'hb-wv-login-m-err-gen' },
  ERR_INTERNAL_SERVER: { key: 'hb-wv-login-m-err-gen' },
  ERR_USER_ACCOUNT_INVALID_CREDENTIALS: { key: 'hb-wv-login-m-err-auth' },
  ERR_USER_ACCOUNT_NOT_FOUND: { key: 'hb-wv-login-m-err-not-found' },
  ERR_USER_ACCOUNT_TEL_NOT_FOUND: { key: 'hb-wv-api-e-tel-not-found' },
  ERR_USER_ACCOUNT_INVALID_OTP: { key: 'hb-wv-api-e-invalid-otp' },
  ERR_INVALID_TOKEN: { key: 'hb-wv-login-m-err-gen' },
  ERR_REFRESH_TOKEN_EXPIRED: { key: 'hb-wv-login-m-err-gen' },
  // New error codes mapping
  ERR_USER_ACCOUNT_ID_NOT_FOUND: { key: 'hb-wv-api-e-user-not-found' },
  ERR_USER_ACCOUNT_OLD_PASSWORD_NOT_MATCH: { key: 'hb-wv-api-e-old-pass-wrong' },
  ERR_USER_ACCOUNT_NEW_PASSWORD_NOT_MATCH: { key: 'hb-wv-api-e-new-pass-mismatch' },
  ERR_USER_ACCOUNT_ALREADY_ACTIVED: { key: 'hb-wv-api-e-acc-activated' },
  ERR_USER_ACCOUNT_INVALID: { key: 'hb-wv-api-e-acc-invalid' },
  ERR_USER_ACCOUNT_TEL_EXISTED: { key: 'hb-wv-api-e-tel-existed' },
  ERR_USER_ACCOUNT_UNACTIVED: { key: 'hb-wv-api-e-acc-unactive' },
  ERR_USER_ACCOUNT_BANNED: { key: 'hb-wv-api-e-acc-banned' },
  ERR_USER_ACCOUNT_DELETED: { key: 'hb-wv-api-e-acc-deleted' },
  ERR_USER_ACCOUNT_UNAUTHORIZED: { key: 'hb-wv-api-e-unauthorized' },
  ERR_USER_ACCOUNT_ALREADY_LOGOUT: { key: 'hb-wv-api-e-logged-out' },
  ERR_USER_ACCOUNT_FORBIDDEN: { key: 'hb-wv-api-e-forbidden' },
  ERR_USER_ACCOUNT_MISSING_ACCESS_TOKEN: { key: 'hb-wv-api-e-missing-token' },
  ERR_USER_ACCOUNT_EMAIL_NOT_FOUND: { key: 'hb-wv-api-e-email-not-found' },
};

/**
 * Proxy giúp xử lý các mã lỗi chưa được định nghĩa.
 * Nếu API trả về một mã lỗi lạ, nó sẽ dùng chính mã đó làm Key để dễ debug.
 */
export const API_ERROR_MESSAGES = new Proxy(baseApiErrors, {
  get: (target, prop: string) => {
    return target[prop] || { key: prop };
  }
});

const toI18nKey = (prop: string) => prop.toLowerCase().replace(/_/g, '-');

/**
 * LANG_KEYS Proxy cho các nhãn UI
 */
export const LANG_KEYS: any = new Proxy({}, {
  get: (_target, prop: string) => {
    const key = typeof prop === 'string' ? toI18nKey(prop) : prop;
    return {
      key: key,
      fallback: key
    };
  }
});
