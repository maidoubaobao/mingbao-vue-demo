'use strict'
const path = require('path')

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                target:'http://iptv-test.ihou.com:5053', //代理地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
        },
        host: 'localhost',
        port: 8080,
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        useEslint: true,
        showEslintErrorsInOverlay: false,
        devtool: 'cheap-module-eval-source-map',
        cacheBusting: true,
        cssSourceMap: true
    },

    build: {
        index: path.resolve(__dirname, '../wechat-auth/index.html'),
        assetsRoot: path.resolve(__dirname, '../wechat-auth'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/wechat-auth/',
        productionSourceMap: false,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
}
