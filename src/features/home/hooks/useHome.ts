import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '~/stores/auth.store';
import { useNavigate } from 'ejsc-ma-router';
import { apisAsync } from 'ejsc-ma-api';

export const useHome = () => {
  const { user, setAuth } = useAuthStore();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchNativeUser = useCallback(async () => {
    try {
      const res = await apisAsync.getUserInfo();
      if (res.success && res.data) {
        setAuth(res.data);
      }
    } catch (e) {
      console.error('[useHome] Fetch native user failed:', e);
    }
  }, [setAuth]);

  useEffect(() => {
    if (!user) {
      fetchNativeUser();
    }
  }, [user, fetchNativeUser]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchNativeUser(); // Làm mới cả thông tin user
    await new Promise((r) => setTimeout(r, 600));
    setIsRefreshing(false);
  };

  return {
    user,
    navigate,
    handleRefresh,
    isRefreshing
  };
};
