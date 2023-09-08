// https://github.com/wooorm/xdm#syntax-highlighting-with-the-meta-field

import { visit } from 'unist-util-visit';

const re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g;

export const rehypeMetaAttribute = () => {
  return (tree) => {
    visit(tree, 'element', visitor);
  };

  function visitor(node, _index, parentNode) {
    let match;

    if (node.tagName === 'code' && node.data && node.data.meta) {
      re.lastIndex = 0; // Reset regex.

      // biome-ignore lint/suspicious/noAssignInExpressions: TODO
      while ((match = re.exec(node.data.meta))) {
        node.properties[match[1]] = match[2] || match[3] || match[4] || '';
        parentNode.properties[match[1]] =
          match[2] || match[3] || match[4] || '';
      }
    }
  }
};
