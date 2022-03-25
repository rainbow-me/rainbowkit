import { style } from '@vanilla-extract/css';
import { sprinkles, themeVars } from '../../css/sprinkles.css';

export const QRCodeBackgroundClassName = style([
  {
    background: 'white',
  },
]);

export const FadeScrollClassName = style([
  sprinkles({
    paddingX: '18',
  }),
  {
    maxHeight: 464,
    overflowY: 'auto',
    selectors: {
      '&:before': {
        background: `linear-gradient(to bottom, ${themeVars.colors.modalBackground} 60%, rgba(255, 255, 255, 0) 100%)`,
        content: "''",
        display: 'block',
        height: '24px',
        marginBottom: -14,
        marginLeft: -6,
        marginRight: -6,
        position: 'sticky',
        top: '0',
        zIndex: 1,
      },
    },
  },
]);
