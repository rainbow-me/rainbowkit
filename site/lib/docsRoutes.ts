import type { Doc } from '.contentlayer/generated';

type PartialDoc = Pick<Doc, 'slug'>;

export type RouteProps = {
  section: string;
  pages: PartialDoc[];
};

export const docsRoutes: RouteProps[] = [
  {
    section: 'overview',
    pages: [{ slug: 'introduction' }, { slug: 'migration-guide' }],
  },

  {
    section: 'getting_started',
    pages: [
      { slug: 'installation' },
      { slug: 'connect-button' },
      { slug: 'modal-sizes' },
      { slug: 'theming' },
      { slug: 'chains' },
      { slug: 'localization' },
      { slug: 'authentication' },
      { slug: 'recent-transactions' },
    ],
  },

  {
    section: 'advanced',
    pages: [
      { slug: 'modal-hooks' },
      { slug: 'custom-connect-button' },
      { slug: 'custom-theme' },
      { slug: 'custom-wallet-list' },
      { slug: 'custom-wallets' },
      { slug: 'custom-chains' },
      { slug: 'custom-app-info' },
      { slug: 'custom-avatars' },
      { slug: 'custom-authentication' },
      { slug: 'wallet-button' },
      { slug: 'cool-mode' },
    ],
  },
];

export const allDocsRoutes: PartialDoc[] = docsRoutes.reduce(
  (acc: PartialDoc[], curr) => {
    // biome-ignore lint/style/noParameterAssign: TODO
    // biome-ignore lint/performance/noAccumulatingSpread: TODO
    acc = [...acc, ...curr.pages];
    return acc;
  },
  [],
);
