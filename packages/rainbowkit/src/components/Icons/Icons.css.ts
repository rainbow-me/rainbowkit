import { keyframes, style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const DropdownIconClassName = sprinkles({
  marginLeft: '6',
});

export const CloseIconClassName = sprinkles({
  marginLeft: '6',
});

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const SpinnerIconClassName = style({
  animation: `${spin} 4s infinite linear`,
});
