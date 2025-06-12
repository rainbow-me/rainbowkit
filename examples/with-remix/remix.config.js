/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  future: {
    v3_throwAbortReason: true,
    v3_relativeSplatPath: true,
    v3_lazyRouteDiscovery: true,
    //v3_singleFetch: true,
    v3_fetcherPersist: true,
  },
  browserNodeBuiltinsPolyfill: {
    modules: { buffer: true, events: true, http: true },
  },
};
