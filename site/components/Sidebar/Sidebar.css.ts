import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { atoms } from 'css/atoms';
import { vars } from 'css/vars.css';

export const link = recipe({
  base: style([
    atoms({
      borderRadius: '3',
      color: 'label',
      display: 'block',
      fontSize: '3',
      marginBottom: '2',
      paddingX: '5',
      paddingY: '3',
    }),
    style({
      fontWeight: 600,
      outline: 'none',
      textDecoration: 'none',
    }),
  ]),
  variants: {
    active: {
      false: style([
        atoms({
          backgroundColor: { focus: 'fillElevated', hover: 'fillSecondary' },
          transform: {
            active: 'shrink',
          },
          transitionDuration: '100',
          transitionProperty: 'all',
          transitionTimingFunction: 'ease',
        }),
      ]),
      true: style([
        atoms({ backgroundColor: { base: 'blue' } }),
        style({
          boxShadow: `0px 2px 8px rgba(0, 0, 0, 0.2)`,
          color: vars.colors.labelWhite,
        }),
      ]),
    },
  },
});
