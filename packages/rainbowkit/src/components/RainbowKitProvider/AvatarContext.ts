import React, { createContext } from 'react';

export type AvatarComponentProps = {
  address: string;
  ensImage?: string | null;
  size: number;
};
export type AvatarComponent = React.FunctionComponent<AvatarComponentProps>;

export const defaultAvatar = {
  component: undefined,
  overrideEnsImage: false,
};

export const AvatarContext =
  createContext<{ component?: AvatarComponent; overrideEnsImage: boolean }>(
    defaultAvatar
  );
