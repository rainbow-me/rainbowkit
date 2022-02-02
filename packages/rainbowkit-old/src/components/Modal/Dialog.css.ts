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
    background: 'modalBackground',
    borderRadius: 'modal',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24',
    position: 'relative',
  }),
  {
    minHeight: '525px',
    width: '390px',
  },
]);
