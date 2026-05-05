const storageKey = 'WALLETCONNECT_DEEPLINK_CHOICE';

export function setWalletConnectDeepLink({
  mobileUri,
  name,
}: {
  mobileUri: string;
  name: string;
}) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(
    storageKey,
    JSON.stringify({
      href: mobileUri.split('?')[0],
      name,
    }),
  );
}

export function clearWalletConnectDeepLink() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(storageKey);
  }
}
