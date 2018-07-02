//
// This file exists to get postcss modules to work.
//
const path = require('path')
const precss = require('precss')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              camelCase: true,
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                precss(),
              ]
            }
          }
        ],
        include: path.resolve(__dirname, '../')
      }
    ]
  }
}
