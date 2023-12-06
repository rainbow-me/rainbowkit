import React, { ReactNode, createContext, useContext, useMemo } from 'react';
import {
  ResponsiveValue,
  normalizeResponsiveValue,
} from '../../css/sprinkles.css';
import { isMobile } from '../../utils/isMobile';

export interface ResponsiveRpcSettings {
  balance: ResponsiveValue<boolean>;
  ensName: ResponsiveValue<boolean>;
  ensAvatar: ResponsiveValue<boolean>;
  transactions: ResponsiveValue<boolean>;
}

export const defaultRpcSettings: ResponsiveRpcSettings = {
  balance: { largeScreen: true, smallScreen: true },
  ensName: { largeScreen: true, smallScreen: true },
  ensAvatar: { largeScreen: true, smallScreen: true },
  transactions: { largeScreen: true, smallScreen: true },
};

const ResponsiveRpcConfigContext =
  createContext<ResponsiveRpcSettings>(defaultRpcSettings);

interface ResponsiveRpcSettingsProviderProps {
  responsiveRpcSettings?: ResponsiveRpcSettings;
  children: ReactNode;
}

export const ResponsiveRpcSettingsProvider = ({
  responsiveRpcSettings,
  children,
}: ResponsiveRpcSettingsProviderProps) => {
  const mergedConfig = {
    ...defaultRpcSettings,
    ...(responsiveRpcSettings || {}),
  };

  return (
    <ResponsiveRpcConfigContext.Provider value={mergedConfig}>
      {children}
    </ResponsiveRpcConfigContext.Provider>
  );
};

const useResponsiveRpcValue = <T extends keyof ResponsiveRpcSettings>(
  key: T,
): boolean => {
  const config = useContext(ResponsiveRpcConfigContext);
  const configValue = config[key];

  const mobile = isMobile();

  const useResponsiveValue = (value: ResponsiveValue<boolean>): boolean => {
    const normalizedValues = normalizeResponsiveValue(value);

    return mobile
      ? !!normalizedValues.smallScreen
      : !!normalizedValues.largeScreen;
  };

  return useMemo(
    () => useResponsiveValue(configValue),
    [configValue, useResponsiveValue],
  );
};

export const useShowBalance = () => useResponsiveRpcValue('balance');

export const useShowEnsName = () => useResponsiveRpcValue('ensName');

export const useShowEnsAvatar = () => useResponsiveRpcValue('ensAvatar');

export const useShowTransactions = () => useResponsiveRpcValue('transactions');
