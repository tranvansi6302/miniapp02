import React, { useEffect } from 'react';
import { Router } from 'ejsc-ma-router';
import { NavBarProvider, ToastContainer, GlobalDialog } from 'ejsc-ma-component';
import { useLogRelay } from '~/hooks/useLogRelay';
import { appRouterConfig } from '~/navigation';
import { NativeLogConsole } from 'ejsc-ma-component';

import { useQuery } from '@tanstack/react-query';
import { apisAsync } from 'ejsc-ma-api';
import { useAuthStore } from '~/stores/auth.store';
import i18n from './locales/i18n';

import './bridge/mockBridge';
import 'ejsc-ma-component/dist/styles.css';
import { langApi } from './apis/lang.api';
import { serviceApi } from './apis/service.api';



export interface AppProps {
  devTool?: {
    enableSocketLog?: boolean;
    enableNativeLog?: boolean;
  };
}

export default function App({ devTool }: AppProps = {}) {
  useLogRelay(devTool);
  const { setAuth } = useAuthStore();

  const { data: data } = useQuery({
    queryKey: ['getAllLang'],
    queryFn: langApi.getAllLanguages
  })
  const { data: servicesData } = useQuery({
    queryKey: ['getAllServices'],
    queryFn: () => serviceApi.getAllServices({

      servPid: 0
    })
  })

  console.log('getAllLang', data)

  useEffect(() => {
    if (servicesData) {
      console.log('>>> [Services] Top 8 services:', servicesData);
    }
  }, [servicesData]);


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

      // Nạp động vào i18n từ dữ liệu API
      i18n.addResourceBundle('vi', 'translation', viRes, true, true);
      i18n.addResourceBundle('en', 'translation', enRes, true, true);
      i18n.changeLanguage(i18n.language);

      /* 
      // Log đối soát với file local (chỉ để rà soát, không nạp vào app)
      import('../dictionarys/i18n_dictionary.json').then((module) => {
        const localDict = module.default;
        const localKeys = localDict.map((i: any) => i.Id);
        const apiKeys = data.map((i: any) => i.Id);
        const missingInApi = localKeys.filter(k => !apiKeys.includes(k));

        console.group('🔍 [i18n Audit]');
        console.log(`API total: ${apiKeys.length} | Local reference: ${localDict.length}`);
        if (missingInApi.length > 0) {
          console.warn('⚠️ Server chưa có các Key này:', missingInApi);
        } else {
          console.log('✅ API đã đồng bộ đầy đủ với dictionary local');
        }
        console.groupEnd();
      });
      */
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
      {devTool?.enableNativeLog && <NativeLogConsole />}
    </NavBarProvider>
  );
}
