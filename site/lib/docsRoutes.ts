/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Doc } from '.contentlayer/generated';

type PartialDoc = Pick<Doc, 'title'> & Pick<Doc, 'slug'>;

export type RouteProps = {
  label: string;
  pages: PartialDoc[];
  section?: string;
};

export const docsRoutes: RouteProps[] = [
  {
    label: 'Overview',
    pages: [
      { title: 'Introduction', slug: 'introduction' },
      { title: 'Migration Guide', slug: 'migration-guide' },
    ],
  },

  {
    label: 'Getting Started',
    pages: [
      { title: 'Installation', slug: 'installation' },
      { title: 'ConnectButton', slug: 'connect-button' },
      { title: 'Modal Sizes', slug: 'modal-sizes' },
      { title: 'Theming', slug: 'theming' },
      { title: 'Chains', slug: 'chains' },
      { title: 'Authentication', slug: 'authentication' },
      { title: 'Recent Transactions', slug: 'recent-transactions' },
    ],
  },

  {
    label: 'Advanced',
    pages: [
      { title: 'Modal Hooks', slug: 'modal-hooks' },
      { title: 'Custom ConnectButton', slug: 'custom-connect-button' },
      { title: 'Custom Theme', slug: 'custom-theme' },
      { title: 'Custom Wallet List', slug: 'custom-wallet-list' },
      { title: 'Custom Wallets', slug: 'custom-wallets' },
      { title: 'Custom Chains', slug: 'custom-chains' },
      { title: 'Custom App Info', slug: 'custom-app-info' },
      { title: 'Custom Avatars', slug: 'custom-avatars' },
      { title: 'Custom Authentication', slug: 'custom-authentication' },
      { title: 'Cool Mode', slug: 'cool-mode' },
    ],
  },
];

export const allDocsRoutes: PartialDoc[] = docsRoutes.reduce((acc, curr) => {
  acc = [...acc, ...curr.pages];
  return acc;
}, []);
