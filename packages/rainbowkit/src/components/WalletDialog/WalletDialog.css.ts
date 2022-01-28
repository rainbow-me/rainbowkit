import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const dialog = style([
  sprinkles({ display: 'flex', flexDirection: 'column', gap: '24' }),
  {
    width: '388px',
  },
]);

export const accountInfo = style([
  sprinkles({
    background: 'modalBackground',
    borderRadius: 'modal',
    display: 'flex',
    flexDirection: 'column',
    gap: '16',
    justifyContent: 'flex-start',
    padding: '24',
  }),
]);
