const path = require('path')
const creatVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname, '../client/index.js'),
    output: {
        filename: 'app.[hash:8].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public/'
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(vue|js|jsx)$/,
                loader: 'eslint-loader',
                exclude:'/node_modules'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options:creatVueLoaderOptions(isDev)
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude:'/node_modules'
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 1024, // 可转 Base64
                        name: 'resources/[name].[hash:8].[ext]'
                    }
                }]
            }
        ]
    }
}

module.exports = config
