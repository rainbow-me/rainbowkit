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
    pages: [
      { title: 'Installation', slug: 'installation' },
      { title: 'ConnectButton', slug: 'connect-button' },
      { title: 'Theming', slug: 'theming' },
      { title: 'Chains', slug: 'chains' },
    ],
  },

  {
    label: 'Advanced',
    pages: [
      { title: 'Custom ConnectButton', slug: 'custom-connect-button' },
      { title: 'Custom Theme', slug: 'custom-theme' },
      { title: 'Custom Wallet List', slug: 'custom-wallet-list' },
      { title: 'Custom Wallets', slug: 'custom-wallets' },
      { title: 'Custom "Learn More" link', slug: 'custom-learn-more-link' },
    ],
  },
];

export const allDocsRoutes: PartialDoc[] = docsRoutes.reduce((acc, curr) => {
  acc = [...acc, ...curr.pages];
  return acc;
}, []);
