import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  border: 0,
  boxSizing: 'border-box',
  fontFamily:
    'SFRounded,ui-rounded,SF Pro Rounded,system-ui,Helvetica Neue,Arial,Helvetica,sans-serif',
  fontSize: '100%',
  margin: 0,
  padding: 0,
  verticalAlign: 'baseline',
  WebkitTapHighlightColor: 'transparent',
});

globalStyle('body', {
  backgroundColor: 'black',
  color: 'white',
});
