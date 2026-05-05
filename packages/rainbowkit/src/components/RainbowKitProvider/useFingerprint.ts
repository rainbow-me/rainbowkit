import { useCallback, useEffect } from 'react';

const storageKey = 'rk-version';

function setRainbowKitVersion({ version }: { version: string }) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKey, version);
  }
}

export function useFingerprint() {
  const fingerprint = useCallback(() => {
    setRainbowKitVersion({ version: '__buildVersion' });
  }, []);
  useEffect(() => {
    fingerprint();
  }, [fingerprint]);
}
