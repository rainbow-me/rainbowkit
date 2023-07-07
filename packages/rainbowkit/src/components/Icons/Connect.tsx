import React from 'react';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { loadImages } from '../AsyncImage/useAsyncImage';

const src = async () => (await import('./connect.svg')).default;

export const preloadConnectIcon = () => loadImages(src);

export const ConnectIcon = () => (
  <AsyncImage
    background="#515a70"
    borderColor="generalBorder"
    borderRadius="10"
    height="48"
    src={src}
    width="48"
  />
);
