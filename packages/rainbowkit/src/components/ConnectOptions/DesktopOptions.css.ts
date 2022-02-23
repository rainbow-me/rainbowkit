import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const walletLogoClassName = sprinkles({
  borderRadius: '6',
});

export const QRCodeBackgroundClassName = style([
  {
    background: 'white',
  },
]);
