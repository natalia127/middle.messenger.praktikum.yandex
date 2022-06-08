const path = require('path');

const loadDev =  () => {
  return {
    devServer: {
      open: true,
      compress: true,
      hot: true,
      port: 8080,
      static: {
        directory: path.join(__dirname, './dist'),
      },
      historyApiFallback: true
    }
  }
}
module.exports = {
  loadDev
};