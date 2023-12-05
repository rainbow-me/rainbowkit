import { useEffect, useMemo, useState } from 'react';
import { i18n } from './index';

export const useTranslation = (): {
  t: (key: string, options?: any) => string;
  i18n: typeof i18n;
} => {
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    const unsubscribe = i18n.onChange(() => {
      setUpdateCount((count) => count + 1);
    });
    return unsubscribe;
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  return useMemo(() => {
    const t = (key: string, options?: any) => i18n.t(key, options);
    return { t, i18n };
  }, [updateCount]);
};
