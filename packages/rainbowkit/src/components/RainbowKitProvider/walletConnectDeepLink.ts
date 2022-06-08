const storageKey = 'WALLETCONNECT_DEEPLINK_CHOICE';

export function setWalletConnectDeepLink({
  mobileUri,
  name,
}: {
  mobileUri: string;
  name: string;
}) {
  if (mobileUri.startsWith('http') && mobileUri.includes('?uri=')) {
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
  if (localStorage.getItem(storageKey)) {
    alert('cleaning wallet connect deep link');
  }

  localStorage.removeItem(storageKey);
}
