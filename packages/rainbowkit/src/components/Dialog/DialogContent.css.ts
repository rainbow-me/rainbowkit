import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const dialogContent = style([
  sprinkles({
    background: 'modalBackground',
    borderRadius: 'modal',
    display: 'flex',
    flexDirection: 'column',
    padding: '24',
    position: 'relative',
  }),
]);
