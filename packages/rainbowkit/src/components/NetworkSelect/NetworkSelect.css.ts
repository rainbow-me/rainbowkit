import { globalStyle, style } from '@vanilla-extract/css';
import { sprinkles } from '../../css/sprinkles.css';

export const ListStyles = style({
  backdropFilter: 'blur(20px)',
  minWidth: '160px',
  top: '42px',
  zIndex: 10,
});

export const ButtonStyles = style([
  sprinkles({
    background: 'dropdownButtonBackground',
  }),
  {
    backdropFilter: 'blur(20px)',
  },
]);

globalStyle(`${ButtonStyles} img`, {
  marginRight: 0,
});

export const IndicatorStyles = style({
  top: 'calc(50% - 4px)',
});

export const SelectOptionStyles = sprinkles({
  padding: '10',
});

export const CurrentChainOptionStyles = sprinkles({
  background: 'menuItemSelectedBackground',
});
