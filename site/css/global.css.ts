import { globalFontFace, globalStyle } from '@vanilla-extract/css';
import { vars } from './vars.css';

globalFontFace('SFRounded', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 400,
  src: "url('/fonts/subset-SFRounded-Regular.eot?') format('embedded-opentype'), url('/fonts/subset-SFRounded-Regular.woff2') format('woff2'), url('/fonts/subset-SFRounded-Regular.woff') format('woff')",
});

globalFontFace('SFRounded', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 500,
  src: "url('/fonts/subset-SFRounded-Medium.eot?') format('embedded-opentype'), url('/fonts/subset-SFRounded-Medium.woff2') format('woff2'), url('/fonts/subset-SFRounded-Medium.woff') format('woff')",
});

globalFontFace('SFRounded', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 600,
  src: "url('/fonts/subset-SFRounded-Semibold.eot?') format('embedded-opentype'), url('/fonts/subset-SFRounded-Semibold.woff2') format('woff2'), url('/fonts/subset-SFRounded-Semibold.woff') format('woff')",
});

globalFontFace('SFRounded', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 700,
  src: "url('/fonts/subset-SFRounded-Bold.eot?') format('embedded-opentype'), url('/fonts/subset-SFRounded-Bold.woff2') format('woff2'), url('/fonts/subset-SFRounded-Bold.woff') format('woff')",
});

globalFontFace('SFRounded', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 800,
  src: "url('/fonts/subset-SFRounded-Heavy.eot?') format('embedded-opentype'), url('/fonts/subset-SFRounded-Heavy.woff2') format('woff2'), url('/fonts/subset-SFRounded-Heavy.woff') format('woff')",
});

globalFontFace('SFMono', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 800,
  src: "url('/fonts/SF-Mono-Regular.eot?') format('embedded-opentype'), url('/fonts/SF-Mono-Regular.woff2') format('woff2'), url('/fonts/SF-Mono-Regular.woff') format('woff')",
});

globalStyle('*, ::before, ::after', {
  boxSizing: 'border-box',
});

globalStyle('::selection', {
  backgroundColor: 'var(--selectionColor)',
  color: vars.colors.labelWhite,
  WebkitTextFillColor: vars.colors.labelWhite,
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
  fontWeight: 400,
  MozOsxFontSmoothing: 'subpixel-antialiased',
  WebkitFontSmoothing: 'subpixel-antialiased',
});

globalStyle('button', {
  appearance: 'none',
  background: 'transparent',
});

globalStyle('svg', {
  verticalAlign: 'middle',
});

globalStyle('[data-emoji]', {
  fontFamily: 'system-ui',
  fontWeight: 400,
});
