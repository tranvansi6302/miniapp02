import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Link } from 'ejsc-ma-router';
import { Eye, EyeOff } from 'lucide-react';
import { Text, Input, Button, Lang } from 'ejsc-ma-component';
import type { LoginFormValues } from '../types/login.schema';

interface LoginFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
  t: (key: string) => string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isPending, t }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { control, formState: { errors } } = useFormContext<LoginFormValues>();

  return (
    <div className="relative z-10 bg-white px-8 pt-4 pb-10 flex flex-col gap-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              label={t('hb-wv-login-l-phone')}
              placeholder="3653653636"
              type="tel"
              inputMode="tel"
              enterKeyHint="next"
              prefix={
                <div className="flex items-center gap-1.5 pr-2 border-r border-ejsc-border mr-1">
                  <img
                    src={new URL('../../../assets/icons/vietnam-icon.png', import.meta.url).href}
                    alt="VN"
                    className="h-5 w-5 rounded-full object-cover"
                  />
                  <Text variant="sub" className="text-ejsc-text-main">+84</Text>
                </div>
              }
              error={errors.phone?.message ? t(errors.phone.message) : undefined}
              {...field}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^\d+]/g, '');
                if (raw.length > 12) return;
                field.onChange(raw);
              }}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              label={t('hb-wv-login-l-pass')}
              placeholder="******"
              type={showPassword ? 'text' : 'password'}
              enterKeyHint="done"
              error={errors.password?.message ? t(errors.password.message) : undefined}
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
              <Lang id="hb-wv-login-f-forgot" />
            </Text>
          </Link>
        </div>

        <Button
          theme="brand"
          block
          size='md'
          className="rounded-full shadow-lg shadow-ejsc-brand/20 mt-2"
          type="submit"
          loading={isPending}
          disabled={isPending}
        >
          {isPending ? (
            <Lang id="hb-wv-login-b-loading" />
          ) : (
            <Lang id="hb-wv-login-b-submit" />
          )}
        </Button>
      </form>

      <div className="flex justify-center mt-4">
        <Text variant="base" className="text-ejsc-text-sub">
          <Lang id="hb-wv-login-f-no-acc" />{' '}
          <Link to="/register">
            <Text variant="base" weight="medium" className="text-ejsc-brand">
              <Lang id="hb-wv-login-f-reg" />
            </Text>
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default LoginForm;
