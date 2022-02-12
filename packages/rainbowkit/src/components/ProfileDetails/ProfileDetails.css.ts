import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const ProfileDetailsImageClassName = sprinkles({
  borderRadius: 'full',
  height: '54',
  width: '54',
});

export const CloseButtonClassName = style([
  {
    ':hover': {
      transform: 'scale(1.1)',
    },
    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    ':active': {
      transform: 'scale(0.9)',
    },
    'transition': '0.125s ease',
  },
]);
