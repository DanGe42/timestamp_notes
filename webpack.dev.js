const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // Sets webpack-dev-server to serve assets from /dist
        publicPath: '/dist'
    }
});
