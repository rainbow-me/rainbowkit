import React from 'react';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { loadImages } from '../AsyncImage/useAsyncImage';

const src = async () => (await import('./login.svg')).default;

export const preloadLoginIcon = () => loadImages(src);

export const LoginIcon = () => (
  <AsyncImage
    background="#d0d5de"
    borderRadius="10"
    height="48"
    src={src}
    width="48"
  />
);
