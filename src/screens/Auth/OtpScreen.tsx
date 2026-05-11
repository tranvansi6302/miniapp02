import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { StandardPage, KeyboardAvoidWrapper, Text, Button, Lang, FullPageLoading } from 'ejsc-ma-component';
import { useVerifyOtp, OtpHeader, OtpInput, AuthService } from '~/features/auth';

interface OtpFormValues {
  otp: string;
}

const OtpScreen: React.FC = () => {
  const { t } = useTranslation();
  const { handleVerify, handleResend, isPending } = useVerifyOtp();
  const [countdown, setCountdown] = React.useState<number>(60);
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const tempEmail = AuthService.getTempCredentials()?.email || '';

  React.useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer!);
  }, [countdown]);

  const onResendClick = async () => {
    if (countdown > 0 || isPending) return;
    try {
      await handleResend();
      setShowAlert(true);
      setCountdown(60); // Reset bộ đếm
    } catch (error) {
      // Error handled in hook
    }
  };

  const { control, handleSubmit, watch } = useForm<OtpFormValues>({
    defaultValues: {
      otp: ''
    }
  });

  const otpValue = watch('otp');

  const onSubmit = (data: OtpFormValues) => {
    handleVerify(data.otp);
  };

  return (
    <StandardPage hideAppBar contentClassName="px-0 pt-0 bg-white" className="bg-white">
      <KeyboardAvoidWrapper>
        {/* Header riêng biệt của trang OTP */}
        <OtpHeader />

        <div className="px-8 pt-4 pb-10 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Text variant="h2" weight="bold" className="text-ejsc-text-main">
                <Lang id="hb-wv-otp-t" />
              </Text>
              <Text variant="base" className="text-ejsc-text-sub leading-relaxed">
                <Lang id="hb-wv-otp-d" />
              </Text>
            </div>

            {/* Alert thông báo gửi lại mã */}
            {showAlert && (
              <div className="relative bg-blue-50 border border-blue-100 p-4 rounded-ejsc flex items-start gap-3 animate-fade-in">
                <div className="flex-1">
                  <Text variant="base" className="text-blue-600  leading-relaxed">
                    {t('hb-wv-otp-alert-resend', { email: tempEmail })}
                  </Text>
                </div>
                <button
                  onClick={() => setShowAlert(false)}
                  className="p-1 -mr-1 text-blue-400 hover:text-blue-600 active:scale-95 transition-all bg-transparent border-none"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            {/* Tích hợp React Hook Form qua Controller */}
            <Controller
              name="otp"
              control={control}
              render={({ field: { onChange, value } }) => (
                <OtpInput
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <div className="flex flex-col gap-4">
              <Button
                theme="brand"
                block
                size="md"
                className="rounded-full shadow-lg shadow-ejsc-brand/20"
                disabled={otpValue.length < 6 || isPending}
                loading={isPending}
                type="submit"
              >
                <Lang id="hb-wv-otp-b-submit" />
              </Button>

              <div className="flex justify-center">
                <Text variant="base" className="text-ejsc-text-sub">
                  <Lang id="hb-wv-otp-f-no-code" />{' '}
                  <div
                    onClick={onResendClick}
                    className={`inline-block transition-opacity ${countdown > 0 || isPending ? 'opacity-50 cursor-default' : 'cursor-pointer active:opacity-60'}`}
                  >
                    <Text variant="base" weight="medium" className="text-ejsc-brand">
                      <Lang id="hb-wv-otp-f-resend" />
                      {countdown > 0 && ` (${countdown}s)`}
                    </Text>
                  </div>
                </Text>
              </div>
            </div>
          </form>
        </div>
      </KeyboardAvoidWrapper>
      {isPending && <FullPageLoading />}
    </StandardPage>
  );
};

export default OtpScreen;
