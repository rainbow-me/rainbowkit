import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const PillStyles = style([
  sprinkles({
    background: 'dropdownButtonBackground',
    borderRadius: 'dropdownButton',
    boxShadow: 'dropdownButton',
    padding: '6',
  }),
  {
    backdropFilter: 'blur(20px)',
  },
]);
