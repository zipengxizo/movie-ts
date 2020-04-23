const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = {
    productionSourceMap: false,
    publicPath: '/movie',
    devServer: {
        proxy: {
            '/api2': {
                target: 'http://8.129.170.158:3000/',
                // target: 'http://localhost:3000/',
                changeOrigin: true
            },
            '/api': {
                target: 'http://39.97.33.178',
                // target: 'http://8.129.170.158:3000/',
                changeOrigin: true
            },
        }
    },
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        }
    },
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'production') {
            return {
                performance: {
                    hints: 'warning',
                    //入口起点的最大体积 整数类型（以字节为单位）
                    maxEntrypointSize: 50000000,
                    //生成文件的最大体积 整数类型（以字节为单位 300k）
                    maxAssetSize: 30000000,
                    //只给出 js 文件的性能提示
                    assetFilter: function (assetFilename) {
                        return assetFilename.endsWith('.js');
                    }
                },
                plugins: [
                    new CompressionWebpackPlugin({
                        filename: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: productionGzipExtensions,
                        threshold: 2048,
                        minRatio: 0.8
                    })
                ]
            }
        } else {
            return {
                devtool: 'source-map'
            }
        }
    }

}