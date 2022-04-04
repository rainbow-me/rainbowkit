import { globalStyle } from '@vanilla-extract/css';

import { vars } from './vars.css';

globalStyle('*, ::before, ::after', {
  boxSizing: 'border-box',
});

globalStyle('body', {
  backgroundColor: vars.colors.backgroundElevated,
  color: vars.colors.label,
  fontFamily:
    'SFRounded, ui-rounded, SF Pro Rounded, system-ui, Helvetica Neue, Arial, Helvetica, sans-serif',
  fontSize: '100%',
  letterSpacing: 0.35,
  margin: 0,
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
  display: 'inline-block',
  height: vars.space[1],
  marginRight: vars.space[4],
  verticalAlign: 'middle',
  width: vars.space[4],
});

globalStyle('svg', {
  verticalAlign: 'middle',
});
