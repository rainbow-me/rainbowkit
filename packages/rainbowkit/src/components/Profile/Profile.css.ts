import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const ProfilePillImageClassName = sprinkles({
  borderRadius: 'full',
  height: '24',
  marginRight: '6',
  width: '24',
});

export const ProfilePillClassName = style([
  {
    ':hover': {
      transform: 'scale(1.025)',
    },
    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    ':active': {
      transform: 'scale(0.95)',
    },
    'transition': '0.125s ease',
  },
]);

export const InnerProfilePillClassName = style([
  {
    transition: '0.125s ease',
  },
]);
