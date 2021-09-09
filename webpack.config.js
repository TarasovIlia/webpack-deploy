const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpakPlaugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

const filename = ext => isDev? `[name].${ext}` : `[name].[hash].${ext}`

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: {
            presets: ["@babel/preset-env"]
        }
    }] 
    if (isDev) {
        loaders.push('eslint-loader')
    }
    return loaders
} 

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main:'./index.js',
        analytics:'./analytics.js'
    },
    stats: {
        children: false,
        modules: false,
        errors: true,
        errorDetails: false,
    },
    optimization : {
        splitChunks: {
            chunks: "all"
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "src")
        },
        port: 4200,
        hot: isDev
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, "prod")
    },
    resolve: {
        extensions: [".js",".json", ".png"] 
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html"
        }),
        new CleanWebpackPlugin(),
        new CopyWebpakPlaugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/myfavicon.ico'),
                    to: path.resolve(__dirname, 'prod')
                }
            ]
        }),
        new MiniCssExtractPlugin ({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use : [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use : [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        }
                    }
                ]
            },
            {
                test: /\.(ttd|woff|woff2|eot)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.xml$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "xml-loader"
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: jsLoaders()
            }
        ]
    } 
}