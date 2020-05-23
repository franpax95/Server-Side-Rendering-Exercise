const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const rules = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
    },
    {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [ "ignore-loader" ]
    },
    {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [ "ignore-loader" ]
    }
];

module.exports = {
    watchOptions: {
        ignored: /node_modules/
    },
    target: "node",
    entry: path.join(__dirname, 'src', 'server.js'),
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.jsx', '.js']
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, './build-server'),
        publicPath: '/'
    },
    module: {
        rules
    },
    plugins: [
        new webpack.DefinePlugin({
            __isClientSide__: "false"
        })
    ]
};