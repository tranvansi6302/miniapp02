import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Link } from 'ejsc-ma-router';
import { Eye, EyeOff } from 'lucide-react';
import { Text, Input, Button, Lang, Checkbox } from 'ejsc-ma-component';
import type { RegisterFormValues } from '../types/register.schema';

interface RegisterFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
  t: (key: string) => string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isPending, t }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { control, formState: { errors } } = useFormContext<RegisterFormValues>();

  return (
    <div className="relative z-10 bg-white px-8 pt-4 pb-10 flex flex-col gap-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-5">

        {/* Row for LastName and FirstName */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  label={t('hb-wv-reg-l-lname')}
                  placeholder={t('hb-wv-reg-p-lname')}
                  error={errors.lastName?.message ? t(errors.lastName.message) : undefined}
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex-1">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  label={t('hb-wv-reg-l-fname')}
                  placeholder={t('hb-wv-reg-p-fname')}
                  error={errors.firstName?.message ? t(errors.firstName.message) : undefined}
                  {...field}
                />
              )}
            />
          </div>
        </div>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              label={t('hb-wv-reg-l-email')}
              placeholder={t('hb-wv-reg-p-email')}
              type="email"
              error={errors.email?.message ? t(errors.email.message) : undefined}
              {...field}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              label={t('hb-wv-reg-l-phone')}
              placeholder={t('hb-wv-reg-p-phone')}
              type="tel"
              inputMode="tel"
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
              label={t('hb-wv-reg-l-pass')}
              placeholder={t('hb-wv-reg-p-pass')}
              type={showPassword ? 'text' : 'password'}
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

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input
              label={t('hb-wv-reg-l-confirm')}
              placeholder={t('hb-wv-reg-p-confirm')}
              type={showPassword ? 'text' : 'password'}
              error={errors.confirmPassword?.message ? t(errors.confirmPassword.message) : undefined}
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

        <Controller
          name="agreement"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1.5 mt-1">
              <Checkbox
                checked={field.value}
                onChange={field.onChange}
                size="lg"
                label={
                  <div className="-mt-0.5">
                    <Text variant="base" className="leading-relaxed">
                      <Lang id="hb-wv-reg-f-agree-prefix" />{' '}
                      <span className="text-ejsc-brand font-medium"><Lang id="hb-wv-reg-f-terms" /></span> <Lang id="hb-wv-reg-f-and" />{' '}
                      <span className="text-ejsc-brand font-medium"><Lang id="hb-wv-reg-f-privacy" /></span> <Lang id="hb-wv-reg-f-agree-suffix" />
                    </Text>
                    {errors.agreement?.message && (
                      <Text variant="caption" block className="text-ejsc-danger mt-1">
                        {t(errors.agreement.message)}
                      </Text>
                    )}
                  </div>
                }
              />
            </div>
          )}
        />

        <Button
          theme="brand"
          block
          size='md'
          className="rounded-full shadow-lg shadow-ejsc-brand/20 mt-4"
          type="submit"
          loading={isPending}
          disabled={isPending}
        >
          {isPending ? <Lang id="hb-wv-reg-b-loading" /> : <Lang id="hb-wv-reg-b-submit" />}
        </Button>
      </form>

      <div className="flex items-center justify-center mt-2">
        <Text variant="base" className="text-ejsc-text-sub">
          <Lang id="hb-wv-reg-f-has-acc" />{' '}
          <Link to="/login">
            <Text variant="base" weight="medium" className="text-ejsc-brand">
              <Lang id="hb-wv-reg-f-login" />
            </Text>
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default RegisterForm;
