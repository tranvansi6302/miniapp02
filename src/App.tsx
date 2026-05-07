import React, { useEffect } from 'react';
import { Router } from 'ejsc-ma-router';
import { NavBarProvider, ToastContainer, GlobalDialog } from 'ejsc-ma-component';
import { useLogRelay } from '~/hooks/useLogRelay';
import { appRouterConfig } from '~/navigation/app-router-config';
import { useQuery } from '@tanstack/react-query';
import { apisAsync } from 'ejsc-ma-api';
import { useAuthStore } from '~/stores/auth.store';
import i18n from './locales/i18n';

import './bridge/mockBridge';
import 'ejsc-ma-component/dist/styles.css';
import { langQueryApi } from './apis/defines/lang/query/lang.query.api';



export interface AppProps {
  devTool?: {
    enableSocketLog?: boolean;
  };
}

export default function App({ devTool }: AppProps = {}) {
  useLogRelay(devTool);
  const { setAuth } = useAuthStore();

  const { data: data } = useQuery({
    queryKey: ['getAllLang'],
    queryFn: langQueryApi.getAllLanguages
  })





  useEffect(() => {
    if (data && Array.isArray(data)) {
      const viRes: Record<string, string> = {};
      const enRes: Record<string, string> = {};

      data.forEach((item: any) => {
        if (item.Id) {
          viRes[item.Id] = item.Vn || '';
          enRes[item.Id] = item.En || '';
        }
      });

      // Nạp động vào i18n
      i18n.addResourceBundle('vi', 'translation', viRes, true, true);
      i18n.addResourceBundle('en', 'translation', enRes, true, true);


    }
  }, [data]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: profileStr } = await apisAsync.getStorage({ key: 'userProfile' });
        const { data: accessToken } = await apisAsync.getStorage({ key: 'accessToken' });
        const { data: refreshToken } = await apisAsync.getStorage({ key: 'refreshToken' });

        if (profileStr && accessToken) {
          const profile = typeof profileStr === 'string' ? JSON.parse(profileStr) : profileStr;
          setAuth({
            ...profile,
            accessToken,
            refreshToken
          });
        }
      } catch (err) {
        console.error('App initAuth error:', err);
      }
    };
    initAuth();
  }, [setAuth]);

  return (
    <NavBarProvider>
      <Router config={appRouterConfig} />
      <ToastContainer />
      <GlobalDialog />
    </NavBarProvider>
  );
}
