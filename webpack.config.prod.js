const config = require('./webpack.config.dev')

module.exports = {
  ...config,
  mode: 'production',
  devtool: 'none'
}