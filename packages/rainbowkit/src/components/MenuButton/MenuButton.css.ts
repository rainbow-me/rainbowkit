import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const MenuButtonClassName = style([
  sprinkles({
    background: {
      active: 'menuItemActiveBackground',
      hover: 'menuItemBackground',
    },
    borderRadius: 'menuButton',
    paddingX: '14',
    paddingY: '10',
    transform: {
      active: 'shrink',
      hover: 'grow',
    },
    transition: 'default',
  }),
]);

export const SelectedMenuButtonClassName = style([
  sprinkles({
    background: 'menuItemBackground',
    borderRadius: 'menuButton',
    paddingX: '14',
    paddingY: '10',
  }),
]);
