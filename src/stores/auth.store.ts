import { create } from 'zustand';

interface AuthState {
  user: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (data: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setAuth: (data) => {
    // Trường hợp data là profile object trực tiếp (từ getStorage)
    const userProfile = data.userProfile || data;
    const accessToken = data.AccessToken || data.accessToken || null;
    const refreshToken = data.RefreshToken || data.refreshToken || null;
    
    set({ 
      user: userProfile, 
      accessToken,
      refreshToken
    });
  },
  logout: () => set({ user: null, accessToken: null, refreshToken: null }),
}));
