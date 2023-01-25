import React, { createContext } from 'react';
import { EmojiAvatar } from '../Avatar/EmojiAvatar';

export type AvatarFallbackTheme = 'nouns' | 'emojis';

export type AvatarComponentProps = {
  address: string;
  ensImage?: string | null;
  size: number;
  fallbackTheme?: AvatarFallbackTheme;
};
export type AvatarComponent = React.FunctionComponent<AvatarComponentProps>;

export const defaultAvatar = EmojiAvatar;

export const AvatarContext = createContext<AvatarComponent>(defaultAvatar);

export const AvatarFallbackContext =
  createContext<AvatarFallbackTheme>('emojis');
