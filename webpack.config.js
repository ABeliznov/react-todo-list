/*
    npm install --save-dev
    webpack webpack cli
    clean-webpack-plugin clean-html-plugin
    sass sass-loader style-loader css-loader file-loader
    babel-loader @babel/core @babel/preset-react @babel/polyfill
    typescript ts-loader

    react react-dom
*/

const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = {
    entry: ['@babel/polyfill', './src/index.tsx'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[hash].js"
    },
    mode: "development",
    devServer:  {
        port: 5000
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onEnd: {
                    move: [
                        { source: '/dist', destination: '/backend/static' },
                    ],
                },
            },
        }),
        new HTMLWebpackPlugin({template: "./src/index.html"}),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    }
}