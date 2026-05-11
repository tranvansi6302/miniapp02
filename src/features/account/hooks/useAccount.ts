import React from 'react';
import { useNavigate } from 'ejsc-ma-router';
import { apisAsync } from 'ejsc-ma-api';
import { toast } from 'ejsc-ma-component';
import { useAuthStore } from '~/stores/auth.store';
import { authApi } from '~/apis/auth.api';

export const useAccount = () => {
  const navigate = useNavigate();
  const { user, logout: logoutStore, setAuth } = useAuthStore();
  const [debugData, setDebugData] = React.useState<any>(null);

  const fetchNativeUser = React.useCallback(async () => {
    try {
      // Gọi Bridge API để lấy thông tin user từ Native
      const res = await apisAsync.getUserInfo();
      if (res.success && res.data) {
        // Đồng bộ thông tin vào store
        setAuth(res.data);
      }
    } catch (e) {
      console.error('[useAccount] Fetch native user failed:', e);
    }
  }, [setAuth]);

  const loadDebugData = React.useCallback(async () => {
    const token = await apisAsync.getStorage({ key: 'accessToken' });
    const profile = await apisAsync.getStorage({ key: 'userProfile' });
    setDebugData({ accessToken: token.data, userProfile: profile.data });
  }, []);

  React.useEffect(() => {
    // Nếu chưa có user trong store, thử lấy từ Native Bridge
    if (!user) {
      fetchNativeUser();
    } else {
      loadDebugData();
    }
  }, [user, fetchNativeUser, loadDebugData]);

  const handleLogout = async () => {
    try {
      await apisAsync.clearStorage();
      window.localStorage.clear();
      window.sessionStorage.clear();
      
      logoutStore();
      setDebugData(null);
      toast.success('Đã đăng xuất thành công');
      
      try {
        await authApi.logout();
      } catch (e) {
        console.warn('Logout API failed but storage cleared', e);
      }
      
      navigate('/login');
    } catch (err: any) {
      toast.error('Lỗi đăng xuất: ' + err.message);
    }
  };

  return {
    user,
    debugData,
    handleLogout,
    loadDebugData,
    navigate
  };
};
