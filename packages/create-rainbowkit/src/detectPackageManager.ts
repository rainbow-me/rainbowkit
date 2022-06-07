import { execSync } from 'child_process';

export type PackageManager = 'npm' | 'pnpm' | 'yarn';

export function detectPackageManager(): PackageManager {
  try {
    const userAgent = process.env.npm_config_user_agent;

    if (userAgent) {
      if (userAgent.startsWith('pnpm')) {
        return 'pnpm';
      } else if (userAgent.startsWith('yarn')) {
        return 'yarn';
      } else if (userAgent.startsWith('npm')) {
        return 'npm';
      }
    }
    try {
      execSync('pnpm --version', { stdio: 'ignore' });
      return 'pnpm';
    } catch {
      execSync('yarn --version', { stdio: 'ignore' });
      return 'yarn';
    }
  } catch {
    return 'npm';
  }
}
