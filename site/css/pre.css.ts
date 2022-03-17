/* eslint-disable sort-keys-fix/sort-keys-fix */
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from './vars.css';

export const pre = style({
  vars: {
    '--background': vars.colors.fillElevated,
    '--text': vars.colors.label,
    '--outline': 'inset 0 0 0 1px transparent',
    '--syntax1': vars.colors.purple,
    '--syntax2': vars.colors.blue,
    '--syntax3': vars.colors.purple,
    '--syntax4': vars.colors.blue,
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
  borderRadius: '18px',
  padding: '20px 25px',
  overflow: 'auto',
  fontSize: '16px',
  lineHeight: '21px',
  whiteSpace: 'pre',
  position: 'relative',
  backgroundColor: 'var(--background)',
  color: 'var(--text)',
  boxShadow: 'var(--outline)',
  display: 'block',
});

globalStyle(`${pre} code`, {
  display: 'block',
});

globalStyle(`${pre} .token.parameter`, {
  color: 'var(--text)',
});

const syntax1 = [
  '.token.tag',
  '.token.class-name',
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
