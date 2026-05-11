import { authApi } from '~/apis/auth.api';
import { OTP_METHOD } from '~/constants/otp-method';
import { MAIL_LANGUAGE } from '~/constants/mail-language';
import { OTP_CASE } from '~/constants/otp-case';
import type { RegisterRequestType } from '~/types/auth/requests/auth.req.type';
import type { LoginFormValues } from '../types/login.schema';
import type { RegisterFormValues } from '../types/register.schema';
import type { LoginResponse } from '../types';

// Lưu trữ tạm thời thông tin đăng ký để tự động login sau khi OTP thành công
interface TempCredentials extends LoginFormValues {
  email?: string;
}

let _tempCredentials: TempCredentials | null = null;

export const AuthService = {
  /**
   * Lưu thông tin đăng nhập tạm thời
   */
  saveTempCredentials(data: TempCredentials) {
    _tempCredentials = { ...data };
  },

  /**
   * Lấy thông tin đăng nhập tạm thời
   */
  getTempCredentials() {
    return _tempCredentials;
  },

  /**
   * Xóa thông tin đăng nhập tạm thời
   */
  clearTempCredentials() {
    _tempCredentials = null;
  },
  /**
   * Chuẩn hóa số điện thoại về định dạng 0xxx
   */
  /**
   * Chuẩn hóa số điện thoại về định dạng 10 chữ số (bắt đầu bằng 0)
   */
  normalizePhone(phone: string): string {
    let normalized = phone.trim().replace(/\s+/g, '');

    // Xử lý đầu số +84 hoặc 84
    if (normalized.startsWith('+84')) {
      normalized = '0' + normalized.slice(3);
    } else if (normalized.startsWith('84') && normalized.length > 9) {
      normalized = '0' + normalized.slice(2);
    }

    // Nếu độ dài là 9 và không bắt đầu bằng 0, thêm 0 vào đầu
    if (normalized.length === 9 && !normalized.startsWith('0')) {
      normalized = '0' + normalized;
    }

    return normalized;
  },

  /**
   * Thực hiện login
   */
  async login(data: LoginFormValues): Promise<LoginResponse> {
    const normalizedPhone = this.normalizePhone(data.phone);

    return (await authApi.login({
      Tel: normalizedPhone,
      Password: data.password
    })) as unknown as LoginResponse;
  },

  /**
   * Thực hiện đăng ký
   */
  async register(data: RegisterFormValues): Promise<void> {
    const normalizedPhone = this.normalizePhone(data.phone);
    // Lưu lại thông tin để tự động đăng nhập sau này (Bao gồm cả Email)
    this.saveTempCredentials({
      phone: normalizedPhone,
      password: data.password,
      email: data.email
    });

    await authApi.register({
      Tel: normalizedPhone,
      Password: data.password,
      FirstName: data.firstName,
      LastName: data.lastName,
      Email: data.email,
      SendOTPMethod: (data.otpMethod || OTP_METHOD.SMS).toUpperCase(),
      MailLanguage: MAIL_LANGUAGE.VI
    } as RegisterRequestType);
  },

  /**
   * Kích hoạt tài khoản bằng mã OTP
   */
  async activateAccount(tel: string, otp: string): Promise<void> {
    const normalizedPhone = this.normalizePhone(tel);
    await authApi.activateAccount({
      Tel: normalizedPhone,
      OTP: otp
    });
  },

  /**
   * Gửi lại mã OTP
   */
  async reSendOtp(): Promise<void> {
    const temp = this.getTempCredentials();
    if (!temp?.phone) return;

    await authApi.reSendOtp({
      Tel: temp.phone,
      Email: temp.email || '',
      Case: OTP_CASE.DEFAULT,
      Method: (OTP_METHOD.SMS).toUpperCase(),
      MailLanguage: MAIL_LANGUAGE.VI
    });
  }
};
