function readPackage(pkg) {
  // Filter dependencies in app templates that are present in the root package.json.
  // This allows us to provide complete package.json files for all app templates.
  if (
    /-app$/.test(pkg.name) || // create-rainbowkit templates (e.g. next-app)
    /^with-/.test(pkg.name) // example apps (e.g. with-next)
  ) {
    pkg.dependencies = omitRootDependencies(pkg.name, pkg.dependencies);
    pkg.devDependencies = omitRootDependencies(pkg.name, pkg.devDependencies);
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};

function omitRootDependencies(packageName, dependencies) {
  const packageJson = require('./package.json');
  const rootDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const filteredDependencies = {};
  const allowedDuplicatePackages = [
    // None for now
  ];

  for (const dep of Object.keys(dependencies)) {
    if (!rootDependencies[dep] || allowedDuplicatePackages.includes(dep)) {
      // Keep the dependency in the app template's package.json since it's not in the
      // root package.json (or in the list of allowed duplicate packages).
      filteredDependencies[dep] = dependencies[dep];
    } else if (rootDependencies[dep] !== dependencies[dep]) {
      throw new Error(
        [
          `Dependency ${dep} has different version in root package.json. Root: ${rootDependencies[dep]}, ${packageName}: ${dependencies[dep]}`,
          packageName === 'generated-test-app' &&
            'You might have stale files left over from a past create-rainbowkit run. Try running "pnpm test:cli:clean" and then "pnpm test:cli:dev" after install to regenerate test app.',
        ]
          .filter(Boolean)
          .join('\n'),
      );
    }
  }

  return filteredDependencies;
}
