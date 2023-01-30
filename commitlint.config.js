/**
 * doc: https://commitlint.js.org/#/reference-rules
 * type(scope?): subject

  build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
  ci: Changes to our CI configuration files and scripts (example scopes: Gitlab CI, Circle, BrowserStack, SauceLabs)
  chore: add something without touching production code (Eg: update npm dependencies)
  docs: Documentation only changes
  feat: A new feature
  fix: A bug fix
  perf: A code change that improves performance
  refactor: A code change that neither fixes a bug nor adds a feature
  revert: Reverts a previous commit
  style: Changes that do not affect the meaning of the code (Eg: adding white-space, formatting, missing semi-colons, etc)
  test: Adding missing tests or correcting existing tests
  tag: Adding tag version
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'chore',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'tag',
      ],
    ],
    // Add rule for commit
    'subject-empty': [0],
    'type-empty': [0],
    // 'subject-max-length': [2, 'always', 72],
  },
}
