import React from 'react';
import { FormProvider } from 'react-hook-form';
import { StandardPage, KeyboardAvoidWrapper, FullPageLoading } from 'ejsc-ma-component';
import { useRegister } from '~/features/auth';
import RegisterHeader from '~/features/auth/components/RegisterHeader';
import RegisterForm from '~/features/auth/components/RegisterForm';

const RegisterScreen: React.FC = () => {
  const { form, isPending, onSubmit, t } = useRegister();

  return (
    <StandardPage hideAppBar contentClassName="px-0 pt-0 bg-white" className="bg-white">
      <FormProvider {...form}>
        <KeyboardAvoidWrapper>
          <RegisterHeader />
          <RegisterForm
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

export default RegisterScreen;
