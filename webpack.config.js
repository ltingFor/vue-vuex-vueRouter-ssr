const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')

const webpack = require('webpack')
const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },

            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 1024, // 可转 Base64
                        name: '[name]-image.[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}
//通过配置了webpack.DefinePlugin，那么这里面的标识就相当于全局变量，你的业务代码可以直接使用配置的标识
if (isDev) {
    config.module.rules.push({
        test: /\.styl$/,
        use: [
            "style-loader",
            "css-loader",
            {
                loader: "postcss-loader",
                options: {
                    sourceMap: true
                }
            },
            "stylus-loader"
        ]
    })
    config.devtool = '#cheap-module-eval-source-map' // 调试代码
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        hot: true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    config.entry={
      app:path.join(__dirname, 'src/index.js'),  
      vendor:['vue']
    } 
    /*chunkhash是在build的时候用，每个chunk都有单独的hash值，互相不依赖，且只有内容有变化的时候才会重新hash，但是
    hash是所有的chunk共用一个hash，且每次都会重新生成hash
    */
    config.output.filename = 'bundle.[chunkhash:8].js'
    config.module.rules.push({
        test: /\.styl$/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true
                    }
                },
                "stylus-loader"
            ]
        })
    })
    //name:'runtime'  表示将webpack等相关的文件打包到一个文件中，使用的名字要是entry中没有声明过的
    //一般常用的是runtime，为了解决每次修改vendor的contentHash值会变化时候，长缓存失效的问题
    config.plugins.push(//contentHash 是根据内容进行hash
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            filename: "vendor.[hash:8].js",
            minChunks: Infinity,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'runtime'
        })
    )
}


module.exports = config