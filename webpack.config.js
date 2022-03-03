const { merge } = require('webpack-merge');
const {loadDev} = require("./webpack/dev")
const {common} = require("./webpack/prod")
const path = require('path');

const initialConfig = {
  entry: './src/index.ts',
  context: __dirname,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'project-name.bundle.js'
  },
}
module.exports = function(env, argv) {
  if (argv.mode === 'production') {
    return merge([
      initialConfig,
      common({
        tsconfigPath: path.resolve(__dirname, 'tsconfig.json')
      }),
    ]);
  }
  if (argv.mode === 'development') {
    return merge([
      initialConfig,
      common({
        tsconfigPath: path.resolve(__dirname, 'tsconfig.json')
      }),
      loadDev(),
    ]);
  }
}
