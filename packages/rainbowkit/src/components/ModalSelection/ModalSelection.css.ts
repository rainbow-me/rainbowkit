import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const HoverClassName = style([
  sprinkles({
    background: {
      active: 'menuItemActiveBackground',
      hover: 'menuItemBackground',
    },
    borderColor: {
      active: 'buttonBorder',
      base: 'modalBackground',
      hover: 'buttonBorder',
    },
    borderRadius: 'menuButton',
    borderStyle: 'solid',
    borderWidth: '1',
    paddingX: '6',
    paddingY: '6',
    transform: {
      active: 'shrink',
      hover: 'grow',
    },
    transition: 'default',
  }),
]);

export const SelectedClassName = style([
  sprinkles({
    background: 'accentColor',
    borderColor: 'buttonBorder',
    borderRadius: 'menuButton',
    borderStyle: 'solid',
    borderWidth: '1',
    paddingX: '6',
    paddingY: '6',
    transition: 'default',
  }),
]);
