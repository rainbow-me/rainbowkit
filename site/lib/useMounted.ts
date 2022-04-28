import { useEffect, useReducer } from 'react';

export function useMounted() {
  const [mounted, mount] = useReducer(() => true, false);
  useEffect(mount, [mount]);
  return mounted;
}
