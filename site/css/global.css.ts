import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  border: 0,
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  WebkitFontSmoothing: 'antialiased',
  WebkitTapHighlightColor: 'transparent',
});

globalStyle('body', {
  // backgroundColor: 'black',
  // color: 'white',
  fontFamily:
    'SFRounded, ui-rounded, SF Pro Rounded, system-ui, Helvetica Neue, Arial, Helvetica, sans-serif',
  fontSize: '100%',
  letterSpacing: 0.35,
});

globalStyle('code, pre', {
  fontFamily: 'SFMono, ui-monospace, monospace',
  fontWeight: 400,
});
