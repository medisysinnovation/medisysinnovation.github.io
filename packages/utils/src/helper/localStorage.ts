import LOCAL_STORAGE_KEY from '../constant/localStorageKey';
import SaveTokenPayload from '../interface/misc/SaveTokenPayload';

export const saveAuthToken = (payload: SaveTokenPayload) => {
  const { access_token: accessToken, refresh_token: refreshToken } = payload;
  localStorage.setItem(LOCAL_STORAGE_KEY.accessTokenKey, accessToken);
  localStorage.setItem(LOCAL_STORAGE_KEY.refreshTokenKey, refreshToken);
};

export const removeAuthToken = () => {
  // clear token
  localStorage.removeItem(LOCAL_STORAGE_KEY.accessTokenKey);
  localStorage.removeItem(LOCAL_STORAGE_KEY.refreshTokenKey);
};

export const setWithExpiry = (key: string, value: any, ttl: number) => {
  const now = new Date();

  // `item` is an object which contains the original value as well as the time when it's supposed to expire
  const item = {
    value,
    expiry: now.getTime() + ttl * 1000,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage and return null
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};
