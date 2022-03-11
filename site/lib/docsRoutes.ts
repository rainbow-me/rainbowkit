/* eslint-disable sort-keys-fix/sort-keys-fix */

import { Doc } from '.contentlayer/generated';

type PartialDoc = Pick<Doc, 'title'> & Pick<Doc, 'slug'>;

export type RouteProps = {
  label: string;
  pages: PartialDoc[];
};

export const docsRoutes: RouteProps[] = [
  {
    label: 'Overview',
    pages: [
      { title: 'Introduction', slug: 'introduction' },
      { title: 'API', slug: 'api' },
    ],
  },

  {
    label: 'Getting Started',
    pages: [{ title: 'Installation', slug: 'installation' }],
  },
];

export const allDocsRoutes: PartialDoc[] = docsRoutes.reduce((acc, curr) => {
  acc = [...acc, ...curr.pages];
  return acc;
}, []);
