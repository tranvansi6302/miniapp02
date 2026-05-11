import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'ejsc-ma-router';
import { toast, logger, useKeyboardDismiss } from 'ejsc-ma-component';
import { API_ERROR_MESSAGES } from '~/locales/api-error-messages';
import { AuthService } from '../services/auth.service';
import { registerSchema, type RegisterFormValues } from '../types/register.schema';
import type { ApiError } from '../types';

export const useRegister = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreement: false
    }
  });

  const registerMutation = useMutation<void, ApiError, RegisterFormValues>({
    mutationFn: (data) => AuthService.register(data),
    onSuccess: () => {
      toast.success(t('hb-wv-api-v-reg-success') || 'Vui lòng xác thực mã OTP');

      navigate('/verify-otp');
    },
    onError: (err) => {
      const errorCode = err.messageCode || err.code || 'AN_UNEXPECTED_ERROR_OCCURRED';
      const errorInfo = API_ERROR_MESSAGES[errorCode] || { key: 'hb-wv-api-error-unexpected' };
      toast.error(t(errorInfo.key));
      logger.log({
        title: 'Register Error',
        message: `Lỗi đăng ký: ${errorCode}`,
        messageCode: errorCode,
        error: err
      });
    }
  });

  const { dismiss } = useKeyboardDismiss();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = form.handleSubmit(async (data) => {
    await dismiss(250);
    setIsSubmitting(true);

    registerMutation.mutate(data, {
      onSettled: () => setIsSubmitting(false)
    });
  });

  return {
    form,
    isPending: isSubmitting || registerMutation.isPending,
    onSubmit,
    t
  };
};
