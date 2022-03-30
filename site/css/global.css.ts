import { globalStyle } from '@vanilla-extract/css';

import { vars } from './vars.css';

globalStyle('*', {
  border: 0,
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  WebkitFontSmoothing: 'antialiased',
  WebkitTapHighlightColor: 'transparent',
});

globalStyle('body', {
  backgroundColor: vars.colors.backgroundElevated,
  color: vars.colors.label,
  fontFamily:
    'SFRounded, ui-rounded, SF Pro Rounded, system-ui, Helvetica Neue, Arial, Helvetica, sans-serif',
  fontSize: '100%',
  letterSpacing: 0.35,
});

globalStyle('code, pre', {
  fontFamily: 'SFMono, ui-monospace, monospace',
  fontWeight: 600,
});

globalStyle('button', {
  appearance: 'none',
  background: 'transparent',
});

globalStyle('li:before', {
  backgroundColor: vars.colors.fill,
  borderRadius: vars.radii[1],
  content: '',
  height: vars.space[1],
  marginRight: vars.space[4],
  width: vars.space[4],
});
