const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const rules = [
    {
        test:/\.jsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
    },
    {
        test:/\.s?css$/,
        exclude: /node_modules/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    hmr: process.env.NODE_ENV === 'development'
                },
            },
            "css-loader",
            "sass-loader"
        ]
    }
]

module.exports = {
    watchOptions: {
        ignored: /node_modules/
    },
    entry: path.join(__dirname, 'src', 'index.js'),
    resolve: {
        extensions: ['.jsx', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build'),
        publicPath: '/'
    },
    module: {
        rules
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, './public/static/'),
                    to: path.resolve(__dirname, './build/static/')
                }
            ]
        })
    ]
};