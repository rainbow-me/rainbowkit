#!/usr/bin/env node
/**
 * Test script to verify wagmi and viem version compatibility.
 *
 * This test catches issues like #2556 where wagmi imports (e.g., sendCallsSync)
 * require viem exports that may not exist in the pinned viem version.
 *
 * The test installs the exact pinned versions from the template (not workspace
 * versions) and verifies that all wagmi imports resolve correctly.
 */

import { execSync } from 'node:child_process';
import { mkdtempSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const colors = {
  red: (str) => `\x1b[31m${str}\x1b[0m`,
  green: (str) => `\x1b[32m${str}\x1b[0m`,
  yellow: (str) => `\x1b[33m${str}\x1b[0m`,
  cyan: (str) => `\x1b[36m${str}\x1b[0m`,
};

console.log(colors.cyan('🧪 Testing wagmi/viem version compatibility...\n'));

// Read template package.json to get pinned versions
const templatePkgPath = join(
  __dirname,
  'templates',
  'next-app',
  'package.json',
);
const templatePkg = JSON.parse(readFileSync(templatePkgPath, 'utf-8'));

const wagmiVersion = templatePkg.dependencies.wagmi;
const viemVersion = templatePkg.dependencies.viem;

console.log('Template versions:');
console.log(`  wagmi: ${wagmiVersion}`);
console.log(`  viem: ${viemVersion}\n`);

// Create temp directory for isolated test
const tempDir = mkdtempSync(join(tmpdir(), 'rainbowkit-compat-test-'));
console.log(`Created temp directory: ${tempDir}\n`);

try {
  // Create minimal package.json with pinned versions
  // Include react as a dependency since wagmi requires it as a peer dependency
  const testPkg = {
    name: 'version-compat-test',
    type: 'module',
    private: true,
    dependencies: {
      wagmi: wagmiVersion,
      viem: viemVersion,
      react: templatePkg.dependencies.react,
      'react-dom': templatePkg.dependencies['react-dom'],
      '@tanstack/react-query':
        templatePkg.dependencies['@tanstack/react-query'],
    },
  };

  writeFileSync(
    join(tempDir, 'package.json'),
    JSON.stringify(testPkg, null, 2),
  );

  // Create test script that imports wagmi functionality
  // This script imports the problematic modules that caused issue #2556
  const testScript = `
import { http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import * as wagmiActions from 'wagmi/actions';
import * as viemActions from 'viem/actions';

console.log('✓ wagmi imports resolved');

// Verify critical viem exports that wagmi depends on
const criticalViemExports = [
  'sendTransaction',
  'getBalance',
  'readContract',
  'writeContract',
  'estimateGas',
  'call',
];

// Check for sendCallsSync - this was the specific export missing in issue #2556
// It's okay if it doesn't exist in viem, but if wagmi tries to use it and it's missing,
// that's the compatibility issue we're testing for
const hasViemSendCallsSync = typeof viemActions.sendCallsSync === 'function';
const hasWagmiSendCallsSync = typeof wagmiActions.sendCallsSync === 'function';

console.log('✓ viem/actions imports resolved');
console.log('✓ wagmi/actions imports resolved');

if (hasWagmiSendCallsSync && !hasViemSendCallsSync) {
  console.error('✗ wagmi exports sendCallsSync but viem does not - version mismatch!');
  process.exit(1);
}

// If wagmi has sendCallsSync, viem must also have it
if (hasWagmiSendCallsSync) {
  console.log('✓ sendCallsSync export compatibility verified');
}

for (const exp of criticalViemExports) {
  if (typeof viemActions[exp] !== 'function') {
    console.error(\`✗ Missing critical viem export: \${exp}\`);
    process.exit(1);
  }
}

console.log('✓ All critical viem exports present');
console.log('\\n🎉 Version compatibility test passed!');
`;

  writeFileSync(join(tempDir, 'test.mjs'), testScript);

  // Install dependencies with npm (not pnpm) to avoid workspace resolution
  console.log(colors.cyan('Installing dependencies with npm...\n'));
  execSync('npm install --legacy-peer-deps 2>&1', {
    cwd: tempDir,
    stdio: 'inherit',
  });

  console.log(colors.cyan('\nRunning compatibility test...\n'));

  // Run the test script
  execSync('node test.mjs', {
    cwd: tempDir,
    stdio: 'inherit',
  });

  console.log(
    colors.green('\n✅ wagmi/viem version compatibility test passed!\n'),
  );
} catch {
  console.error(colors.red('\n❌ Version compatibility test failed!\n'));
  console.error(
    colors.yellow(
      'This likely means the pinned wagmi version requires viem exports ' +
        'that do not exist in the pinned viem version.\n',
    ),
  );
  console.error(
    colors.yellow(
      'To fix: Update the viem version in templates/next-app/package.json ' +
        'to a version compatible with wagmi.\n',
    ),
  );
  process.exit(1);
} finally {
  // Cleanup temp directory
  try {
    rmSync(tempDir, { recursive: true, force: true });
    console.log(`Cleaned up temp directory: ${tempDir}`);
  } catch {
    // Ignore cleanup errors
  }
}
