/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  serverDependenciesToBundle: [
    '@rainbow-me/rainbowkit',
    '@rainbow-me/rainbowkit/wallets',
    /^@?wagmi.*/,
    /.*/,
  ],
};

// https://github.com/remix-run/remix/discussions/2594#discussioncomment-4733564
// Remix currently does not bundle all dependency packages
// /.*/ is the recommended catch-all for missing RainbowKit dependencies
