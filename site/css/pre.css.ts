/* eslint-disable sort-keys-fix/sort-keys-fix */
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from './vars.css';

export const pre = style({
  vars: {
    '--background': vars.colors.fillElevated,
    '--text': vars.colors.blue,
    '--outline': 'inset 0 0 0 1px transparent',
    '--syntax1': vars.colors.purple,
    '--syntax2': vars.colors.orange,
    '--syntax3': vars.colors.pink,
    '--syntax4': vars.colors.labelSecondary,
    '--comment': vars.colors.labelQuaternary,
    '--removed': 'rgb(205, 43, 49)',
    '--added': '$rgb(24, 121, 78)',
    '--lineNumbers': 'rgb(217, 226, 252)',
    '--fadedLines': 'rgb(126, 134, 140)',
    '--highlightedLineBg': 'rgb(245, 242, 255)',
    '--highlightedWord1Bg': 'rgb(237, 233, 254)',
    '--highlightedWord1BgActive': 'rgb(215, 207, 249)',
    '--highlightedWord1Text': 'rgb(87, 70, 175)',
    '--highlightedWord2Bg': 'rgb(255, 239, 239)',
    '--highlightedWord2BgActive': 'rgb(253, 216, 216)',
    '--highlightedWord2Text': 'rgb(205, 43, 49)',
    '--highlightedWord3Bg': 'rgb(233, 249, 238)',
    '--highlightedWord3BgActive': 'rgb(204, 235, 215)',
    '--highlightedWord3Text': '$rgb(24, 121, 78)',
  },

  boxSizing: 'border-box',
  margin: 0,
  borderRadius: vars.radii[5],
  padding: `${vars.space[6]} ${vars.space[11]} ${vars.space[6]} ${vars.space[6]}`,
  overflowX: 'auto',
  fontSize: '14px',
  lineHeight: '22px',
  whiteSpace: 'pre',
  position: 'relative',
  backgroundColor: 'var(--background)',
  color: 'var(--text)',
  boxShadow: 'var(--outline)',
  display: 'flex',
});

globalStyle(`${pre} code`, {
  minWidth: '100%',
  marginRight: 100,
});

globalStyle(`${pre} .token.parameter`, {
  color: 'var(--text)',
});

const syntax1 = [
  '.token.tag',
  '.token.selector',
  '.token.selector .class',
  '.token.function',
];
globalStyle(syntax1.map(s => `${pre} ${s}`).join(`, `), {
  color: 'var(--syntax1)',
});

const syntax2 = [
  '.token.attr-value',
  '.token.class',
  '.token.string',
  '.token.number',
  '.token.unit',
  '.token.color',
];
globalStyle(syntax2.map(s => `${pre} ${s}`).join(`, `), {
  color: 'var(--syntax2)',
});

const syntax3 = [
  '.token.attr-name',
  '.token.keyword',
  '.token.rule',
  '.token.operator',
  '.token.pseudo-class',
  '.token.important',
];
globalStyle(syntax3.map(s => `${pre} ${s}`).join(`, `), {
  color: 'var(--syntax3)',
});

const syntax4 = ['.token.punctuation', '.token.module', '.token.property'];
globalStyle(syntax4.map(s => `${pre} ${s}`).join(`, `), {
  color: 'var(--syntax4)',
});

globalStyle(`${pre} .token.comment`, {
  color: 'var(--comment)',
});

globalStyle(`${pre} .token.class-name`, {
  color: vars.colors.green,
});

const inherit = [
  '.token.atapply .token:not(.rule):not(.important)',
  ' .language-shell .token:not(.comment)',
  ' .language-css .token.function',
];
globalStyle(inherit.map(s => `${pre} ${s}`).join(`, `), {
  color: 'var(--inherit)',
});

const tokensModifiers = [
  '.token.deleted:not(.prefix)',
  '.token.inserted:not(.prefix)',
];
globalStyle(tokensModifiers.map(s => `${pre} ${s}`).join(`, `), {
  display: 'block',
  padding: '0 20px',
  margin: '0 -20px',
});

globalStyle(`${pre} .token.deleted:not(.prefix)`, {
  color: 'var(--removed)',
});

globalStyle(`${pre} .token.inserted:not(.prefix)`, {
  color: 'var(--added)',
});

const tokensModifiersPrefixed = [
  '.token.deleted.prefix',
  '.token.inserted.prefix',
];
globalStyle(tokensModifiersPrefixed.map(s => `${pre} ${s}`).join(`, `), {
  userSelect: 'none',
});

globalStyle(
  `${pre} [data-highlighted=false], ${pre} [data-highlighted=false] .token`,
  {
    color: vars.colors.labelQuaternary,
  }
);

globalStyle(`${pre} .highlight-word`, {
  backgroundColor: vars.colors.red,
  borderRadius: vars.radii[1],
  padding: '0 3px',
});

globalStyle(`${pre} + [data-copy]`, {
  opacity: 0,
  transition: 'opacity 100ms ease',
  zIndex: 2,
});

globalStyle(`${pre}:hover + [data-copy], [data-copy]:hover`, {
  opacity: 1,
});

globalStyle(`${pre} ~ [data-pre-gradient]`, {
  position: 'absolute',
  top: 1,
  right: 0,
  borderTopRightRadius: '15px',
  borderBottomRightRadius: '15px',
  backgroundImage: `linear-gradient(to right, transparent, ${vars.colors.fillElevated})`,
  width: 30,
  height: 'calc(100% - 2px)',
  zIndex: 1,
  pointerEvents: 'none',
});
