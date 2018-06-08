const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
// var MiniCssExtractPlugin = require('mini-css-extract-plugin')

const common = require('./webpack.config.base')

const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'
const definedPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin()
]

let config 
const devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        hot: true
    }

if (isDev) {
    config = merge(common,{
        module:{
            rules:[
                {
                    test: /\.styl$/,
                    use: [
                        "vue-style-loader",
                        {
                            loader: 'css-loader',
                            options: {
                              // enable CSS Modules
                              modules: true,
                              // customize generated class names
                              localIdentName: isDev?'[path]-[name]-[hash:base64:5]':'[hash:base64:5]'
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        "stylus-loader"
                    ]
                }
            ]
        },
        devtool:'#cheap-module-eval-source-map',
        devServer,
        plugins:definedPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    });
} else {
    /*chunkhash是在build的时候用，每个chunk都有单独的hash值，互相不依赖，且只有内容有变化的时候才会重新hash，但是
    hash是所有的chunk共用一个hash，且每次都会重新生成hash
    */
    config = merge(common,{
        entry:{
            app:path.join(__dirname, '../client/index.js'),  
            vendor:['vue']
        },
        output:{
            filename:'app.[chunkhash:8].js'
        },
        module:{
            rules:[
                {
                    test: /\.styl$/,
                    use: ExtractPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            "css-loader",
                            {
                                loader: "postcss-loader",
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                  // enable CSS Modules
                                  modules: true,
                                  // customize generated class names
                                  localIdentName: isDev?'[path]-[name]-[hash:base64:5]':'[hash:base64:5]'
                                }
                            },
                        ]
                    })
                }
            ]
        },
        //vendor里面是业务相关的js，runtime是一些相关的常年不会变的类库包
        plugins:definedPlugins.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name:'vendor',
                filename: "vendor.[hash:8].js",
                minChunks: Infinity,
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name:'manifest',
                minChunks: Infinity
            })
        ])
    })
}


module.exports = config