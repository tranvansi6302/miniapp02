import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'ejsc-ma-router';
import { toast, logger, useKeyboardDismiss } from 'ejsc-ma-component';
import { useAuthStore } from '~/stores/auth.store';
import { setAuthData } from '~/utils/storage.util';
import { API_ERROR_MESSAGES, LANG_KEYS } from '~/locales/api-error-messages';
import { AuthService } from '../services/auth.service';
import { loginSchema, type LoginFormValues } from '../types/login.schema';
import type { LoginResponse, ApiError } from '../types';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const { t } = useTranslation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: '', password: '' }
  });

  const loginMutation = useMutation<LoginResponse, ApiError, LoginFormValues>({
    mutationFn: (data) => AuthService.login(data),
    onSuccess: async (data) => {
      toast.success(t('hb-wv-login-v-success'));
      await setAuthData({
        profile: data,
        accessToken: data.AccessToken || data.accessToken,
        refreshToken: data.RefreshToken || data.refreshToken
      });
      setAuth(data);
      navigate('/');
    },
    onError: (err) => {
      const errorCode = err.messageCode || err.code || 'AN_UNEXPECTED_ERROR_OCCURRED';
      const errorInfo = API_ERROR_MESSAGES[errorCode];
      toast.error(t(errorInfo.key));
      logger.log({ title: 'Login Error', messageCode: errorCode, error: err });
    }
  });

  const { dismiss } = useKeyboardDismiss();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = form.handleSubmit(async (data) => {
    // 1. Đóng bàn phím và đợi thu hồi xong xuôi
    await dismiss(250);

    // 2. Bây giờ mới hiển thị Loading
    setIsSubmitting(true);

    // 3. Gọi API
    loginMutation.mutate(data, {
      onSettled: () => setIsSubmitting(false)
    });
  });

  return {
    form,
    isPending: isSubmitting || loginMutation.isPending,
    onSubmit,
    t
  };
};
