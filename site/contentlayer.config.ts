/* eslint-disable sort-keys-fix/sort-keys-fix */
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `docs/**/*.mdx`,
  bodyType: 'mdx',
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
});
