import React, { createContext } from 'react';
import { EmojiAvatar } from '../Avatar/EmojiAvatar';

export type AvatarComponentProps = {
  address: string;
  ensImage?: string | null;
  size: number;
};
export type AvatarComponent = React.FunctionComponent<AvatarComponentProps>;

export const defaultAvatar = {
  component: EmojiAvatar,
  overrideEnsImage: false,
};

export const AvatarContext =
  createContext<{ component: AvatarComponent; overrideEnsImage: boolean }>(
    defaultAvatar
  );
