import defaultConfig from '@commitlint/config-conventional';

const Configuration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    ...defaultConfig.rules,
    'type-enum': [
      2,
      'always',
      [
        'fix',
        'test',
        'tooling',
        'refactor',
        'revert',
        'example',
        'docs',
        'format',
        'feat',
        'chore',
      ],
    ],
  },
};

export default Configuration;
