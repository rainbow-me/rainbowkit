import { Portal } from '@radix-ui/react-portal';
import { useIsMounted } from 'lib/useIsMounted';
import React from 'react';

export const DocsMobileMenuContext = React.createContext<
  React.RefObject<HTMLDivElement>
>({} as any);

export function DocsMobileMenuSlot({
  children,
}: { children: React.ReactNode }) {
  const docsMobileMenuRef = React.useContext(DocsMobileMenuContext);
  const isMounted = useIsMounted();

  return isMounted() ? (
    <Portal container={docsMobileMenuRef.current}>{children}</Portal>
  ) : null;
}
