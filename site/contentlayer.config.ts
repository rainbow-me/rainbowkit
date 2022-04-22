/* eslint-disable sort-keys-fix/sort-keys-fix */
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkSlug from 'remark-slug';
import { rehypeHighlightCode } from './lib/rehype-highlight-code';
import { rehypeMetaAttribute } from './lib/rehype-meta-attribute';

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `docs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => doc._raw.flattenedPath.replace('docs/', ''),
    },
  },
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Doc],
  mdx: {
    remarkPlugins: [remarkSlug],
    rehypePlugins: [rehypeMetaAttribute, rehypeHighlightCode],
  },
});
