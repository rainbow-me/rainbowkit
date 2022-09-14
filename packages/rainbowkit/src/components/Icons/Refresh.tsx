import React from 'react';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { loadImages } from '../AsyncImage/useAsyncImage';

const src = async () => (await import('./refresh.svg')).default;

export const preloadRefreshIcon = () => loadImages(src);

export const RefreshIcon = () => (
  <AsyncImage
    background="#515a70"
    borderColor="generalBorder"
    borderRadius="10"
    height="48"
    src={src}
    width="48"
  />
);
