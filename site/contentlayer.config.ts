import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkSlug from 'remark-slug';
import { rehypeHighlightCode } from './lib/rehype-highlight-code';
import { rehypeMetaAttribute } from './lib/rehype-meta-attribute';

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: '**/docs/**/*.mdx',
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
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(2).join('/'),
    },
    locale: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFilePath.split('/')[0],
    },
  },
}));

export const Guide = defineDocumentType(() => ({
  name: 'Guide',
  filePathPattern: '**/guides/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (guide) =>
        guide._raw.flattenedPath.split('/').slice(2).join('/'),
    },
    locale: {
      type: 'string',
      resolve: (guide) => guide._raw.sourceFilePath.split('/')[0],
    },
  },
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Doc, Guide],
  mdx: {
    remarkPlugins: [remarkSlug],
    rehypePlugins: [rehypeMetaAttribute, rehypeHighlightCode],
  },
});
