import { keyframes, style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const CloseIconClassName = sprinkles({
  marginLeft: '6',
});

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const SpinnerIconClassName = style({
  animation: `${spin} 3s infinite linear`,
});

export const SpinnerIconPathClassName = style({
  background: `conic-gradient(from 180deg at 50% 50%, rgba(72, 146, 254, 0) 0deg, currentColor 282.04deg, rgba(72, 146, 254, 0) 319.86deg, rgba(72, 146, 254, 0) 360deg)`,
  height: 21,
  width: 21,
});
