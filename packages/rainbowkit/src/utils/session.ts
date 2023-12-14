const storageKey = 'rk-wallet-rainbow-session';

export const savedSessionToken = () => {
  return typeof localStorage !== 'undefined'
    ? localStorage.getItem(storageKey)
    : undefined;
};

export const setSessionToken = (token: string) => {
  return typeof localStorage !== 'undefined'
    ? localStorage.setItem(storageKey, token)
    : undefined;
};

export const removeSessionToken = () => {
  return typeof localStorage !== 'undefined'
    ? localStorage.removeItem(storageKey)
    : undefined;
};
