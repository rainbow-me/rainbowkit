import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const overlay = style([
  sprinkles({
    alignItems: 'center',
    background: 'modalBackdrop',
    display: 'flex',
    height: 'viewHeight',
    justifyContent: 'center',
    position: 'fixed',
    width: 'full',
  }),
  {
    left: 0,
    top: 0,
  },
]);

export const content = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  }),
  {
    width: '390px',
  },
]);
