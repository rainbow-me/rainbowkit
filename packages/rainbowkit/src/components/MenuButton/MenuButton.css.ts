import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const MenuButtonClassName = style([
  sprinkles({
    borderRadius: 'menuButton',
    paddingX: '14',
    paddingY: '10',
  }),
  {
    ':hover': {
      backgroundColor: 'rgba(125, 125, 125, 0.1)',
      transform: 'scale(1.025)',
    },
    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    ':active': {
      backgroundColor: 'rgba(125, 125, 125, 0.2)',
      transform: 'scale(0.975)',
    },
    'transition': '0.125s ease',
    'will-change': 'transform',
  },
]);
