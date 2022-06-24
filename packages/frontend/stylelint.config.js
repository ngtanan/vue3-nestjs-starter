module.exports = {
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-tailwindcss',
    'stylelint-config-recommended-vue'
  ],
  rules: {
    // 'at-rule-no-unknown': [true, {
    //   ignoreAtRules: [
    //     'tailwind',
    //     'apply',
    //     'variants',
    //     'responsive',
    //     'screen',
    //     'function',
    //     'if',
    //     'each',
    //     'include',
    //     'mixin'
    //   ]
    // }],
    'function-no-unknown': [true, {
      ignoreFunctions: ['theme']
    }]
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts']
}
