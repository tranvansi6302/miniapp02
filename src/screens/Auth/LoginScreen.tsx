import React from 'react';
import { FormProvider } from 'react-hook-form';
import { StandardPage, KeyboardAvoidWrapper, FullPageLoading } from 'ejsc-ma-component';
import { useLogin, LoginHeader, LoginForm } from '~/features/auth';

const LoginScreen: React.FC = () => {
  const { form, isPending, onSubmit, t } = useLogin();

  return (
    <StandardPage hideAppBar contentClassName="px-0 pt-0 bg-white" className="bg-white">
      <FormProvider {...form}>
        <KeyboardAvoidWrapper>
          <LoginHeader />
          <LoginForm
            onSubmit={onSubmit}
            isPending={isPending}
            t={t}
          />
        </KeyboardAvoidWrapper>
      </FormProvider>
      {isPending && <FullPageLoading />}
    </StandardPage>
  );
};

export default LoginScreen;
