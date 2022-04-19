import { Portal } from '@radix-ui/react-portal';
import React from 'react';

export const DocsMobileMenuContext = React.createContext<
  React.RefObject<HTMLDivElement>
>({} as any);

export function DocsMobileMenuSlot({ children }) {
  const docsMobileMenuRef = React.useContext(DocsMobileMenuContext);

  return typeof document !== 'undefined' ? (
    <Portal containerRef={docsMobileMenuRef}>{children}</Portal>
  ) : null;
}
