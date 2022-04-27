import { Portal } from '@radix-ui/react-portal';
import { useMounted } from 'lib/useMounted';
import React from 'react';

export const DocsMobileMenuContext = React.createContext<
  React.RefObject<HTMLDivElement>
>({} as any);

export function DocsMobileMenuSlot({ children }) {
  const docsMobileMenuRef = React.useContext(DocsMobileMenuContext);

  return useMounted() ? (
    <Portal containerRef={docsMobileMenuRef}>{children}</Portal>
  ) : null;
}
