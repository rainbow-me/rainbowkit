import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const MenuButtonClassName = style([
  sprinkles({
    background: {
      hover: 'menuItemBackground',
    },
    borderRadius: 'menuButton',
    color: 'modalText',
    padding: '6',
    transform: {
      active: 'shrink',
    },
    transition: 'default',
  }),
]);

export const MobileMenuButtonClassName = style([
  sprinkles({
    padding: '8',
  }),
  {
    selectors: {
      '&:hover': {
        background: 'unset',
      },
    },
  },
]);

export const SelectedMenuButtonClassName = style([
  sprinkles({
    background: 'accentColor',
    borderColor: 'selectedOptionBorder',
    borderRadius: 'menuButton',
    borderStyle: 'solid',
    borderWidth: '1',
    boxShadow: 'selectedOption',
    color: 'actionButtonText',
    padding: '6',
  }),
]);
