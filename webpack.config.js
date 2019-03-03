const mockApi = require('./mock_api')

module.exports = {
  entry: './src/javascripts/index.js',
  output: {
    path: `${__dirname}/dist/js`,
    filename: 'main.js'
  },
  devServer: {
    contentBase: './dist',
    before: mockApi
  }
}