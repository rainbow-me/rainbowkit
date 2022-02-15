import { style } from '@vanilla-extract/css';

export const blur = style({
  background:
    'radial-gradient(169.2% 468.33% at 144.46% 50.28%, #14D5FF 18.6%, #343D86 48.26%, #00B2FF 83.9%)',
  borderRadius: '50%',
  display: 'block',
  filter: 'blur(600px)',
  height: '800px',
  mixBlendMode: 'hard-light',
  position: 'absolute',
  width: '800px',
  zIndex: -1,
});
