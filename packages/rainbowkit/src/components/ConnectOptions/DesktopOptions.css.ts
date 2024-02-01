import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';
export const QRCodeBackgroundClassName = style([
  {
    background: 'white',
  },
]);

export const ScrollClassName = style([
  sprinkles({
    paddingX: '18',
  }),
  {
    maxHeight: 454,
    overflowY: 'auto',
  },
]);

// biome-ignore format: design system keys
export const sidebar = style({
  minWidth: '287px',
});

export const sidebarCompactMode = style({
  minWidth: '100%',
});
