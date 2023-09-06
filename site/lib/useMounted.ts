import { useEffect, useReducer } from 'react';

export function useMounted() {
  const [mounted, mount] = useReducer(() => true, false);
  // rome-ignore lint/nursery/useExhaustiveDependencies: TODO
  useEffect(mount, [mount]);
  return mounted;
}
