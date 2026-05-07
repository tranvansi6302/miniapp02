import React from 'react';

interface TextLangProps {
  id: string;
}

const TextLang: React.FC<TextLangProps> = ({ id }) => {
  // Minimal fallback for translation
  const translations: Record<string, string> = {
    'HB_W_LOGIN_TITLE': 'Đăng nhập',
    'HB_W_LOGIN_WELCOME_MESSAGE': 'Vui lòng nhập thông tin để tiếp tục',
    'HB_W_LOGIN_PHONE_LABEL': 'Số điện thoại',
    'HB_W_LOGIN_PHONE_PLACEHOLDER': '365365365',
    'HB_W_LOGIN_PASSWORD_LABEL': 'Mật khẩu',
    'HB_W_LOGIN_PASSWORD_PLACEHOLDER': '********',
    'HB_W_LOGIN_SUBMIT': 'Đăng nhập',
    'HB_W_LOGIN_SUBMIT_LOADING': 'Đang đăng nhập...',
    'HB_W_LOGIN_FORGOT_PASSWORD': 'Quên mật khẩu?',
    'HB_W_LOGIN_NO_ACCOUNT': 'Chưa có tài khoản?',
    'HB_W_LOGIN_REGISTER_NOW': 'Đăng ký ngay',
    'HB_W_LOGIN_BACK_TO_HOME': 'Quay lại trang chủ',
    'HB_W_LOGIN_DOWNLOAD_APP_LABEL': 'TẢI ỨNG DỤNG',
    'HB_W_LOGIN_DOWNLOAD_ON': 'Tải trên',
    'HB_W_LOGIN_APP_STORE': 'App Store',
    'HB_W_LOGIN_GET_IT_ON': 'Tải trên',
    'HB_W_LOGIN_GOOGLE_PLAY': 'Google Play',
    'HB_W_LOGIN_DOWNLOAD_MOBILE': 'Tải App',
    'HB_W_LOGIN_WELCOME_PREFIX': 'Chào mừng bạn đến với',
    'HB_W_LOGIN_PLATFORM_DESCRIPTION': 'Hệ sinh thái dịch vụ tiện ích tại nhà hàng đầu Việt Nam.',
    'HB_W_LOGIN_ECOSYSTEM_BADGE': 'Hệ sinh thái HomeBooking',
  };

  return <>{translations[id] || id}</>;
};

export default TextLang;
