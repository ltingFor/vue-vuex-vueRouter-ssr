const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

const common = require('./webpack.config.base')

const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'
const definedPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"'
        }
    }),
    new HTMLPlugin({
      template:path.join(__dirname,'template.html')
    })
]

let config
const devServer = {
        port: 8080,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        hot: true
    }
    config = merge(common,{
        entry:path.join(__dirname,'../practice/index.js'),
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
        resolve:{
          alias:{//指定vue的版本，运行时版本，否则vue实例new中不能使用template没有编辑器的功能
            'vue':path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
            // 'vue':path.join(__dirname,'../node_modules/vue/dist/vue.runtime.esm.js')//runtime-only版本不包含模板编译器

          }
        },
        devtool:'#cheap-module-eval-source-map',
        devServer,
        plugins:definedPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    });



module.exports = config
