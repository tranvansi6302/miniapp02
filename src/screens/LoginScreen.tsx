/**
 * @file screens/LoginScreen.tsx
 * @description Màn hình đăng nhập Mini App - Đã tối ưu hóa sử dụng Component chuẩn và Tokens.
 */
import React, { useState } from 'react';
import { Button, StandardPage, Text, toast, Input } from 'ejsc-ma-component';
import { useTranslation } from 'react-i18next';
import Lang from '~/components/Lang';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { useNavigate, Link } from 'ejsc-ma-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { loginSchema, type LoginFormValues } from './login.schema';
import { authCommandApi } from '~/apis/auth/command/auth.command.api';
import { useAuthStore } from '~/stores/auth.store';
import { setAuthData } from '~/utils/storage.util';
import { LANG_KEYS } from '~/constants/lang.config';
import { API_ERROR_MESSAGES } from '~/locales/api-error-messages';
import FullPageLoading from '~/components/FullPageLoading';

const LoginScreen: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      password: ''
    }
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      let normalizedPhone = data.phone.trim().replace(/\s+/g, '');
      if (normalizedPhone.startsWith('+84')) {
        normalizedPhone = '0' + normalizedPhone.slice(3);
      } else if (normalizedPhone.startsWith('84') && normalizedPhone.length > 10) {
        normalizedPhone = '0' + normalizedPhone.slice(2);
      } else if (!normalizedPhone.startsWith('0') && normalizedPhone.length > 0) {
        normalizedPhone = '0' + normalizedPhone;
      }


      const response = await authCommandApi.login({
        Tel: normalizedPhone,
        Password: data.password
      });

      console.log('Login API response:', response);

      // if (!response) {
      //   throw new Error(LANG_KEYS.HB_W_LOGIN_ERROR_GENERAL.fallback);
      // }
      return response;
    },
    onSuccess: async (data: any) => {
      if (data) {
        toast.success(LANG_KEYS.HB_W_LOGIN_SUCCESS_MESSAGE.fallback);
        await setAuthData({
          profile: data,
          accessToken: data.AccessToken || data.accessToken,
          refreshToken: data.RefreshToken || data.refreshToken
        });
        setAuth(data);
        navigate('/');
      }
    },
    onError: (err: any) => {
      // Ánh xạ lỗi từ API sang Key ngôn ngữ và fallback tương ứng
      const errorInfo = API_ERROR_MESSAGES[err.code || err.message];
      toast.error(t(errorInfo.key, errorInfo.fallback));
    }
  });

  const handleLogin = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-white overflow-hidden select-none">
      <StandardPage hideAppBar contentClassName="px-0 pt-0 bg-white" className="bg-white">
        <div className="flex flex-col min-h-full bg-white relative">
          {/* Illustration Section */}
          <div className="flex items-center justify-center px-6 pt-0 pb-2 h-[260px] relative bg-slate-50/50">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-6 z-20 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm select-none active:scale-95 transition-transform w-12 h-12"
              style={{ top: 'calc(1.5rem + env(safe-area-inset-top, 0px))' }}
            >
              <ChevronLeft size={24} className="text-ejsc-text-main" />
            </button>

            <img
              src={new URL('../assets/login-icon.png', import.meta.url).href}
              alt="Login illustration"
              className="h-50 object-contain relative z-10"
              style={{ marginTop: '2rem' }}
            />

            {/* Soft decorative background elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[200px] h-[200px] bg-ejsc-brand/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
          </div>

          {/* Form Panel */}
          <div className="relative z-10 bg-white px-8 pt-6 pb-10 flex flex-col gap-6">
            <div>
              <Text variant="h2" weight="bold" block className="text-ejsc-text-main">
                <Lang id="hb-w-login-title" fallback="Đăng nhập" />
              </Text>
              <Text variant="base" block className="mt-1.5 text-ejsc-text-sub">
                <Lang id="hb-w-login-welcome-message" fallback="Chào mừng bạn đến với HomeBooking" />
              </Text>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-5">
              {/* Số điện thoại sử dụng Component Input chuẩn */}
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    label={<Lang id="hb-w-login-phone-label" fallback="Số điện thoại" />}
                    placeholder="3653653636"
                    type="tel"
                    prefix={
                      <div className="flex items-center gap-1.5 pr-2 border-r border-ejsc-border mr-1">
                        <img
                          src={new URL('../assets/vietnam-icon.png', import.meta.url).href}
                          alt="VN"
                          className="h-5 w-5 rounded-full object-cover"
                        />
                        <Text variant="sub" className="text-ejsc-text-main">+84</Text>
                      </div>
                    }
                    error={errors.phone?.message ? t(errors.phone.message, 'Số điện thoại không hợp lệ') : undefined}
                    {...field}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^\d+]/g, '');
                      if (raw.length > 12) return;
                      field.onChange(raw);
                    }}
                  />
                )}
              />

              {/* Mật khẩu sử dụng Component Input chuẩn */}
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    label={<Lang id="hb-w-login-password-label" fallback="Mật khẩu" />}
                    placeholder="******"
                    type={showPassword ? 'text' : 'password'}
                    error={errors.password?.message ? t(errors.password.message, 'Trường thông tin bắt buộc') : undefined}
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        className="p-1 text-ejsc-text-sub active:opacity-60 transition-opacity"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    }
                    {...field}
                  />
                )}
              />

              <div className="-mt-1 flex justify-end">
                <Link to="/forgot-password">
                  <Text variant="base" weight="medium" className="text-ejsc-brand">
                    <Lang id="hb-w-login-forgot-password" fallback="Quên mật khẩu?" />
                  </Text>
                </Link>
              </div>

              <Button
                theme="brand"
                block
                size='md'
                className=" rounded-full  shadow-lg shadow-ejsc-brand/20 mt-2"
                type="submit"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <Lang id="hb-w-login-submit-loading" fallback="Đang đăng nhập..." />
                ) : (
                  <Lang id="hb-w-login-submit" fallback="Đăng nhập" />
                )}
              </Button>
            </form>

            <div className="text-center mt-4">
              <Text variant="base" className="text-ejsc-text-sub">
                Chưa có tài khoản?{' '}
                <Link to="/register">
                  <Text variant="base" weight="medium" className="text-ejsc-brand">
                    Đăng ký ngay
                  </Text>
                </Link>
              </Text>
            </div>
          </div>
        </div>
        {loginMutation.isPending && <FullPageLoading />}
      </StandardPage>
    </div>
  )
}

export default LoginScreen;
