const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withTM = require('next-transpile-modules')(['@rainbow-me/rainbowkit']);

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
module.exports = withTM(
  withVanillaExtract({
    reactStrictMode: true,
  })
);
