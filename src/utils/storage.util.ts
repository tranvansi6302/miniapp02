import { apisAsync } from 'ejsc-ma-api';

export const setAuthData = async (data: { profile: any; accessToken?: string; refreshToken?: string }) => {
  if (data.accessToken) await apisAsync.setStorage({ key: 'accessToken', data: data.accessToken });
  if (data.refreshToken) await apisAsync.setStorage({ key: 'refreshToken', data: data.refreshToken });
  if (data.profile) await apisAsync.setStorage({ key: 'userProfile', data: JSON.stringify(data.profile) });
};


