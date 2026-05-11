import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'ejsc-ma-router';
import { toast, logger, useKeyboardDismiss } from 'ejsc-ma-component';
import { useTranslation } from 'react-i18next';
import { AuthService } from '../services/auth.service';
import { API_ERROR_MESSAGES } from '~/locales/api-error-messages';
import { OTP_CASE } from '~/constants/otp-case';
import { OTP_METHOD } from '~/constants/otp-method';
import { MAIL_LANGUAGE } from '~/constants/mail-language';
import type { ApiError, LoginResponse } from '../types';

export const useVerifyOtp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { dismiss } = useKeyboardDismiss();
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyMutation = useMutation<LoginResponse, ApiError, { otp: string }>({
    mutationFn: async ({ otp }) => {
      // 1. Lấy thông tin đăng nhập tạm thời
      const temp = AuthService.getTempCredentials();
      if (!temp?.phone) {
        navigate('/register');
        throw new Error('MISSING_TEMP_CREDENTIALS');
      }

      // 2. Gọi API kích hoạt tài khoản
      await AuthService.activateAccount(temp.phone, otp);

      // 3. Nếu kích hoạt thành công, gọi tiếp API login
      return await AuthService.login({
        phone: temp.phone,
        password: temp.password
      });
    },
    onSuccess: (loginResponse: LoginResponse) => {
      toast.success(t('hb-wv-api-v-verify-success') || 'Xác thực thành công!');
      logger.log({
        title: 'Verify & Login Success',
        message: 'Tài khoản đã được kích hoạt và đăng nhập tự động',
        data: loginResponse
      });

      // Xóa thông tin tạm thời sau khi đã login thành công
      AuthService.clearTempCredentials();

      // Điều hướng về trang chủ
      navigate('/');
    },
    onError: (err: ApiError) => {
      let errorCode = err.messageCode || err.code || 'AN_UNEXPECTED_ERROR_OCCURRED';

      const errorInfo = API_ERROR_MESSAGES[errorCode] || { key: 'hb-wv-api-error-unexpected' };
      toast.error(t(errorInfo.key));

      logger.log({
        title: 'Verify OTP Error',
        message: `Lỗi xác thực: ${errorCode}`,
        messageCode: errorCode,
        error: err
      });
    }
  });

  const resendMutation = useMutation<void, ApiError, void>({
    mutationFn: () => AuthService.reSendOtp(),
    onSuccess: () => {
      const temp = AuthService.getTempCredentials();
      toast.success(t('hb-wv-api-v-resend-success') || 'Mã xác thực đã được gửi lại!');
      logger.log({
        title: 'Resend OTP Success',
        message: 'Mã xác thực đã được yêu cầu gửi lại thành công',
        data: {
          Tel: temp?.phone,
          Email: temp?.email || '',
          Case: OTP_CASE.DEFAULT,
          Method: (OTP_METHOD.SMS).toUpperCase(),
          MailLanguage: MAIL_LANGUAGE.VI
        }
      });
    },
    onError: (err: ApiError) => {
      const temp = AuthService.getTempCredentials();
      const errorCode = err.messageCode || err.code || 'AN_UNEXPECTED_ERROR_OCCURRED';
      toast.error(t('hb-wv-api-error-unexpected'));
      logger.log({
        title: 'Resend OTP Error',
        message: `Lỗi khi yêu cầu gửi lại mã: ${errorCode}`,
        requestData: {
          Tel: temp?.phone,
          Email: temp?.email || '',
          Case: OTP_CASE.DEFAULT,
          Method: (OTP_METHOD.SMS).toUpperCase(),
          MailLanguage: MAIL_LANGUAGE.VI
        },
        error: err
      });
    }
  });

  const handleVerify = async (otp: string) => {
    await dismiss(250);
    setIsVerifying(true);
    verifyMutation.mutate({ otp }, {
      onSettled: () => setIsVerifying(false)
    });
  };

  const handleResend = async () => {
    await dismiss(250);
    return resendMutation.mutateAsync();
  };

  return {
    isPending: isVerifying || verifyMutation.isPending || resendMutation.isPending,
    handleVerify,
    handleResend,
    t
  };
};
