module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-tailwindcss',
    'stylelint-config-recommended-vue'
  ],
  rules: {
    'at-rule-no-unknown': [true, {
      ignoreAtRules: [
        'tailwind',
        'apply',
        'variants',
        'responsive',
        'screen',
        'function',
        'if',
        'each',
        'include',
        'mixin'
      ]
    }]
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts']
}
