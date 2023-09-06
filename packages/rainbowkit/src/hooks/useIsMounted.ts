import { useEffect, useReducer } from 'react';

export const useIsMounted = () => {
  const [mounted, setMounted] = useReducer(() => true, false);
  // rome-ignore lint/nursery/useExhaustiveDependencies: TODO
  useEffect(setMounted, [setMounted]);
  return mounted;
};
