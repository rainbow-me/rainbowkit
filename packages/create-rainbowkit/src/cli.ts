#!/usr/bin/env node
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import { Command } from 'commander';
import cpy from 'cpy';
import { execa } from 'execa';
import fs from 'fs-extra';
import prompts from 'prompts';
import validateNpmPackageName from 'validate-npm-package-name';
import { detectPackageManager } from './detectPackageManager';

const log = console.log;

class FriendlyError extends Error {}

async function run() {
  try {
    let projectPath = '';

    const packageJson = createRequire(import.meta.url)('../package.json');

    const program = new Command(packageJson.name)
      .version(packageJson.version)
      .arguments('[project-directory]')
      .usage(`${chalk.green('[project-directory]')} [options]`)
      .action((name) => {
        projectPath = name;
      })
      .option(
        '--use-npm',
        'Explicitly tell the CLI to bootstrap the app using npm',
      )
      .option(
        '--use-yarn',
        'Explicitly tell the CLI to bootstrap the app using Yarn',
      )
      .option(
        '--use-pnpm',
        'Explicitly tell the CLI to bootstrap the app using pnpm',
      )
      .option('--skip-git', 'Skip initializing a git repository')
      .allowUnknownOption()
      .parse(process.argv);

    const options = program.opts();

    const reservedPackageNames = [
      '@rainbow-me/rainbowkit',
      'wagmi',
      'viem',
      'next',
      'react',
      'react-dom',
    ];

    log();
    log(chalk.green('🌈 Welcome to RainbowKit!'));

    const isValidProjectName = (value: string) =>
      validateNpmPackageName(value).validForNewPackages;

    const invalidProjectNameErrorMessage =
      'Project name must be a valid npm package name.';

    if (typeof projectPath === 'string') {
      projectPath = projectPath.trim();
    }

    if (!projectPath) {
      log();
      const { value } = await prompts({
        initial: 'my-rainbowkit-app',
        message: 'What is the name of your project?',
        name: 'value',
        type: 'text',
        validate: (value) => {
          if (!isValidProjectName(value)) {
            return invalidProjectNameErrorMessage;
          }

          if (reservedPackageNames.includes(value)) {
            return `"${value}" is a reserved package name.`;
          }

          return true;
        },
      });

      if (typeof value === 'undefined') {
        log();
        return;
      }

      projectPath = value;
    }

    log();

    if (!isValidProjectName(projectPath)) {
      throw new FriendlyError(
        [
          chalk.red(
            '👀 The project name you provided is not a valid package name.',
          ),
          `🙏 ${invalidProjectNameErrorMessage}`,
        ].join('\n'),
      );
    }

    if (reservedPackageNames.includes(projectPath)) {
      throw new FriendlyError(
        [
          chalk.red(
            '👀 The project name you provided is a reserved package name.',
          ),
          `🙏 Please use a project name other than "${reservedPackageNames.find(
            (x) => x === projectPath,
          )}".`,
        ].join('\n'),
      );
    }

    const targetPath = path.join(process.cwd(), projectPath);

    if (fs.existsSync(targetPath)) {
      throw new FriendlyError(
        [
          chalk.red(`👀 The target directory "${projectPath}" already exists.`),
          '🙏 Please remove this directory or choose a different project name.',
        ].join('\n'),
      );
    }

    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    const templatesPath = path.join(__dirname, '..', 'templates');
    const templateName = 'next-app';
    const selectedTemplatePath = path.join(templatesPath, templateName);

    log(
      chalk.cyan(
        `🚀 Creating a new RainbowKit app in ${chalk.bold(targetPath)}`,
      ),
    );

    const ignoreList: string[] = ['node_modules', '.next', 'CHANGELOG.md'];

    await cpy(path.join(selectedTemplatePath, '**', '*'), targetPath, {
      filter: (src) =>
        ignoreList.every((ignore) => {
          const relativePath = path.relative(selectedTemplatePath, src.path);
          return !relativePath.includes(ignore);
        }),
      rename: (name) => name.replace(/^_dot_/, '.'),
    });

    // Update package name
    const pkgJson = await fs.readJson(path.join(targetPath, 'package.json'));
    pkgJson.name = projectPath;
    pkgJson.version = '0.1.0';

    if (process.env.INSTALL_WORKSPACE_RAINBOWKIT !== 'true') {
      // Remove RainbowKit workspace dependency so we can install latest
      delete pkgJson.dependencies['@rainbow-me/rainbowkit'];
    }

    await fs.writeFile(
      path.join(targetPath, 'package.json'),
      JSON.stringify(pkgJson, null, 2),
    );

    const packageManager = options.usePnpm
      ? 'pnpm'
      : options.useYarn
        ? 'yarn'
        : options.useNpm
          ? 'npm'
          : detectPackageManager();

    log(
      chalk.cyan(
        `📦 Installing dependencies with ${chalk.bold(
          packageManager,
        )}. This could take a while.`,
      ),
    );
    await execa(packageManager, ['install'], {
      cwd: targetPath,
      stdio: 'inherit',
    });

    if (process.env.INSTALL_WORKSPACE_RAINBOWKIT !== 'true') {
      await execa(
        packageManager,
        [
          packageManager === 'yarn' ? 'add' : 'install',
          '@rainbow-me/rainbowkit',
        ],
        {
          cwd: targetPath,
          stdio: 'inherit',
        },
      );
    }

    if (!options.skipGit) {
      log(chalk.cyan('📚 Initializing git repository'));
      await execa('git', ['init'], { cwd: targetPath });
      await execa('git', ['add', '.'], { cwd: targetPath });
      await execa(
        'git',
        [
          'commit',
          '--no-verify',
          '--message',
          'Initial commit from create-rainbowkit',
        ],
        { cwd: targetPath },
      );
    }

    log(chalk.green('🌈 Done! Thanks for using RainbowKit 🙏'));
    log();
    log(
      chalk.cyan(
        `👉 To get started, run ${chalk.bold(
          `cd ${projectPath}`,
        )} and then ${chalk.bold(
          `${packageManager}${packageManager === 'npm' ? ' run' : ''} dev`,
        )}`,
      ),
    );
    log();
  } catch (err) {
    if (err instanceof FriendlyError) {
      log(chalk.yellow(err.message));
      process.exit(1);
    } else {
      throw err;
    }
  }
}

run();
