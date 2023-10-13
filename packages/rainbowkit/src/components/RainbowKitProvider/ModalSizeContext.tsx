import React, { ReactNode, createContext, useContext } from 'react';
import { largeScreenMinWidth } from '../../css/sprinkles.css';
import { useWindowSize } from '../../hooks/useWindowSize';
import { RainbowButtonContext } from './RainbowButtonContext';

export const ModalSizeOptions = {
  COMPACT: 'compact',
  WIDE: 'wide',
} as const;

export type ModalSizes = typeof ModalSizeOptions[keyof typeof ModalSizeOptions];

export const ModalSizeContext = createContext<ModalSizes>(
  ModalSizeOptions.WIDE,
);

interface ModalSizeProviderProps {
  children: ReactNode;
  modalSize?: ModalSizes;
}

export function ModalSizeProvider({
  children,
  modalSize,
}: ModalSizeProviderProps) {
  const { width } = useWindowSize();
  const isSmallScreen = width && width < largeScreenMinWidth;
  const { connector } = useContext(RainbowButtonContext);

  return (
    <ModalSizeContext.Provider
      // @ts-ignore
      value={isSmallScreen || connector ? ModalSizeOptions.COMPACT : modalSize}
    >
      {children}
    </ModalSizeContext.Provider>
  );
}
