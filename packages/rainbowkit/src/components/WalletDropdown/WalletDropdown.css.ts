import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const MenuStyles = style([
  sprinkles({
    boxShadow: 'menu',
  }),
  {
    backdropFilter: 'blur(20px)',
    minWidth: '160px',
    top: '42px',
  },
]);
