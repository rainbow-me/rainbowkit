const storageKey = 'WALLETCONNECT_DEEPLINK_CHOICE';

export function setWalletConnectDeepLink({
  mobileUri,
  name,
}: {
  mobileUri: string;
  name: string;
}) {
  if (
    mobileUri.startsWith('wc:') || // Android
    (mobileUri.startsWith('http') && mobileUri.includes('?uri=')) // iOS
  ) {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        href: mobileUri.split('?')[0],
        name,
      })
    );
  }
}

export function clearWalletConnectDeepLink() {
  localStorage.removeItem(storageKey);
}
