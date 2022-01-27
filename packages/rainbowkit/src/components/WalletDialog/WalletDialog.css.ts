import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const dialog = style([
  {
    justifyContent: 'flex-start !important',
    width: '340px',
  },
  sprinkles({ gap: '16', height: 'max' }),
]);
