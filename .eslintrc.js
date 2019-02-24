module.exports = {
  extends: ['airbnb'],
  plugins: ['babel'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    jasmine: true
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/forbid-prop-types': [0]
  }
};