import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const MenuButtonClassName = style([
  sprinkles({
    background: {
      active: 'menuItemActiveBackground',
      hover: 'menuItemBackground',
    },
    borderRadius: 'menuButton',
    color: 'modalText',
    paddingX: '6',
    paddingY: '6',
    transform: {
      active: 'shrink',
    },
    transition: 'default',
  }),
]);

export const SelectedMenuButtonClassName = style([
  sprinkles({
    background: 'accentColor',
    borderRadius: 'menuButton',
    color: 'buttonText',
    paddingX: '6',
    paddingY: '6',
  }),
]);
