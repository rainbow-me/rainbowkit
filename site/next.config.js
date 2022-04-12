/* eslint-disable sort-keys-fix/sort-keys-fix */
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withPlugins = require('next-compose-plugins');
// TODO: update import https://github.com/contentlayerdev/contentlayer/issues/140
const { withContentlayer: createContentlayer } = require('next-contentlayer');
const withTM = require('next-transpile-modules')(['@rainbow-me/rainbowkit']);

const withVanillaExtract = createVanillaExtractPlugin();
const withContentlayer = createContentlayer();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs/introduction',
        permanent: false,
      },
      {
        source: '/docs',
        destination: '/docs/introduction',
        permanent: false,
      },
    ];
  },
};

module.exports = withPlugins(
  [withVanillaExtract, withContentlayer, withTM],
  nextConfig
);
