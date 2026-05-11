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
    if (!data) return;
    
    // Nếu data truyền vào chỉ có token mà không có user (hoặc ngược lại), 
    // chúng ta giữ lại giá trị cũ của store thay vì set null.
    set((state) => {
      const userProfile = data.userProfile || (data.id ? data : state.user);
      const accessToken = data.AccessToken || data.accessToken || state.accessToken;
      const refreshToken = data.RefreshToken || data.refreshToken || state.refreshToken;

      return {
        user: userProfile,
        accessToken,
        refreshToken
      };
    });
  },
  logout: () => set({ user: null, accessToken: null, refreshToken: null }),
}));
