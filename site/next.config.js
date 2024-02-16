const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withPlugins = require('next-compose-plugins');
// TODO: update import https://github.com/contentlayerdev/contentlayer/issues/140
const { withContentlayer } = require('next-contentlayer');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: [
      'en-US',
      'ar',
      'es-419',
      'fr',
      'hi',
      'id',
      'ja',
      'ko',
      'pt-BR',
      'ru',
      'th',
      'tr',
      'ua',
      'zh-CN',
    ],
    defaultLocale: 'en-US',
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/introduction',
        permanent: false,
      },
      {
        source: '/docs/migrating-to-02',
        destination: '/docs/migration-guide',
        permanent: true,
      },
    ];
  },
};

module.exports = withPlugins(
  [withVanillaExtract, withContentlayer],
  nextConfig,
);
