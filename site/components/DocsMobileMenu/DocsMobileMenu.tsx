import { Portal } from '@radix-ui/react-portal';
import React, { useEffect, useReducer } from 'react';

export const DocsMobileMenuContext = React.createContext<
  React.RefObject<HTMLDivElement>
>({} as any);

function useMounted() {
  const [mounted, mount] = useReducer(() => true, false);
  useEffect(mount, [mount]);
  return mounted;
}

export function DocsMobileMenuSlot({ children }) {
  const docsMobileMenuRef = React.useContext(DocsMobileMenuContext);

  return useMounted() ? (
    <Portal containerRef={docsMobileMenuRef}>{children}</Portal>
  ) : null;
}
