var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
var VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.scss$/, use:['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.less$/, use:['style-loader','css-loader', 'less-loader']},
            {test: /\.(jpg|png|gif|bgm|jpeg)$/, use: ['url-loader?limit=10000&name=[hash:8]-[name].[ext]']},
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use: ['url-loader']},
            {
                test: /.\js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            'transform-remove-strict-mode'
                        ]
                    }
                }
            },
            {test: /\.vue$/, use:['vue-loader']},
        ]
    },
}