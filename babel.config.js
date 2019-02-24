const path = require('path')

module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'entry'
    }],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-object-rest-spread',
    ["module-resolver", {
      "root": [path.join(__dirname, 'app')]
    }]
  ]
}