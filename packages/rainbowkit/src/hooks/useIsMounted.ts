import { useEffect, useReducer } from 'react';

export const useIsMounted = () => {
  const [mounted, setMounted] = useReducer(() => true, false);
  useEffect(setMounted, [setMounted]);
  return mounted;
};
