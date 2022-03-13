import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const HoverClassName = style([
  sprinkles({
    background: {
      hover: 'menuItemBackground',
    },
    borderRadius: 'menuButton',
    borderStyle: 'solid',
    borderWidth: '1',
    paddingX: '5',
    paddingY: '5',
    transform: {
      active: 'shrink',
      hover: 'grow',
    },
    transition: 'default',
  }),
  { borderColor: 'transparent' },
]);

export const SelectedClassName = style([
  sprinkles({
    background: 'accentColor',
    borderColor: 'selectedOptionBorder',
    borderRadius: 'menuButton',
    borderStyle: 'solid',
    borderWidth: '1',
    boxShadow: 'selectedWallet',
    paddingX: '5',
    paddingY: '5',
    transition: 'default',
  }),
]);
