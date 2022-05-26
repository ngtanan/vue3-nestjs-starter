module.exports = {
  ignores: [(commit) => commit.startsWith('setup')],
  extends: [
    '@commitlint/config-conventional',
    '@commitlint/config-lerna-scopes'
  ],
  rules: {
    'references-empty': [2, 'never'],
    'subject-case': [
      2,
      'never',
      [
        'upper-case',
        'camel-case',
        'kebab-case',
        'pascal-case',
        'snake-case'
      ]
    ],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'revert',
        'wip'
      ]
    ]
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*)(?:\((.*)\))?: [A-Z]{1,4}-[0-9]{1,5}\s(.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
      issuePrefixes: ['JIRA']
    }
  }
}