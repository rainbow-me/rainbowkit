/* eslint-disable import/order */
// Inspired by https://github.com/j0lv3r4/mdx-prism

import parseNumericRange from 'parse-numeric-range';
import { visit } from 'unist-util-visit';
import { toString as nodeToString } from 'hast-util-to-string';
import { refractor } from 'refractor/lib/all.js';
import { highlightLine } from './rehype-highlight-line.js';
import { highlightWord } from './rehype-highlight-word.js';

export const rehypeHighlightCode = () => {
  const visitor = (node, index, parentNode) => {
    if (parentNode.tagName === 'pre' && node.tagName === 'code') {
      // syntax highlight
      const lang = node.properties.className
        ? node.properties.className[0].split('-')[1]
        : 'md';

      const registeredLanguages = refractor.listLanguages();
      if (!registeredLanguages.includes(lang)) return;

      let result = refractor.highlight(nodeToString(node), lang);

      // line highlight
      const linesToHighlight = parseNumericRange(node.properties.line || '0');
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
