import type React from 'react';
import { createContext } from 'react';
import { EmojiAvatar } from '../Avatar/EmojiAvatar';

export type AvatarComponentProps = {
  address: string;
  ensImage?: string | null;
  size: number;
};
export type AvatarComponent = React.FunctionComponent<AvatarComponentProps>;

export const defaultAvatar = EmojiAvatar;

export const AvatarContext = createContext<AvatarComponent>(defaultAvatar);
