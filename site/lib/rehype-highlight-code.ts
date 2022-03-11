/* eslint-disable import/order */
// Inspired by https://github.com/j0lv3r4/mdx-prism

import parseNumericRange from 'parse-numeric-range';
import { visit } from 'unist-util-visit';
import type { Visitor } from 'unist-util-visit/complex-types';
import { toString as nodeToString } from 'hast-util-to-string';
// eslint-disable-next-line import/extensions
import { refractor } from 'refractor/lib/all.js';
import { highlightLine } from './rehype-highlight-line';
import { highlightWord } from './rehype-highlight-word';
import type * as hast from 'hast';
import type * as unified from 'unified';

export const rehypeHighlightCode: unified.Plugin = () => {
  const visitor: Visitor<hast.Element, hast.Element> = (
    node,
    index,
    parentNode
  ) => {
    if (parentNode.tagName === 'pre' && node.tagName === 'code') {
      // syntax highlight
      const lang = node.properties.className
        ? node.properties.className[0].split('-')[1]
        : 'md';

      const registeredLanguages = refractor.listLanguages();
      if (!registeredLanguages.includes(lang)) return;

      let result: any = refractor.highlight(nodeToString(node), lang);

      // line highlight
      const linesToHighlight = parseNumericRange(
        (node.properties.line as any) || '0'
      );
      result = highlightLine(result, linesToHighlight);

      // word highlight
      const shouldIgnoreWordHighlight =
        typeof node.properties.ignoreWordHighlight !== 'undefined';
      if (!shouldIgnoreWordHighlight) {
        result = highlightWord(result);
      }

      node.children = result;
    }
  };

  return tree => {
    visit(tree, 'element', visitor);
  };
};
