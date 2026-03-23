const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const webpack = require('webpack');
const path = require('path');
const deps = require('./package.json').dependencies;

require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

const REMOTE_SGP_URL = process.env.REMOTE_SGP_URL || (isProd ? 'https://teraprox-sgp.web.app' : 'http://localhost:3002');
const REMOTE_SGM_URL = process.env.REMOTE_SGM_URL || (isProd ? 'https://teraprox-sgm.web.app' : 'http://localhost:3003');

// Collect all REACT_APP_* env vars for DefinePlugin
const envKeys = Object.keys(process.env)
    .filter(key => key.startsWith('REACT_APP_'))
    .reduce((acc, key) => {
        acc[`process.env.${key}`] = JSON.stringify(process.env[key]);
        return acc;
    }, {});

module.exports = {
    entry: './src/index.js',
    mode: isProd ? 'production' : 'development',
    devServer: {
        port: 3000,
        historyApiFallback: true,
        hot: true,
        liveReload: true,
        client: {
            overlay: false, // Disables the "Uncaught runtime errors" overlay in development
        },
    },
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000, // Check for changes every second
    },
    output: {
        publicPath: 'auto',
        filename: '[name].[contenthash].js',
        chunkFilename: '[id].[contenthash].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'teraprox_core',
            filename: 'remoteEntry.js',
            exposes: {
                './SharedHooks': './src/hooks/SharedHooks',
            },
            remotes: {
                teraprox_app_sgp: `teraprox_app_sgp@${REMOTE_SGP_URL}/remoteEntry.js`,
                teraprox_app_sgm: `teraprox_app_sgm@${REMOTE_SGM_URL}/remoteEntry.js`,
            },
            shared: {
                ...(() => {
                    const shared = {};
                    [
                        'react',
                        'react-dom',
                        'react-redux',
                        'react-router-dom',
                        '@reduxjs/toolkit',
                        'react-icons',
                        'react-bootstrap',
                        'react-toast-notifications',
                        'react-dnd',
                        'react-dnd-html5-backend',
                        'redux-persist',
                        'axios',
                        'dayjs',
                    ].forEach(pkg => {
                        if (deps[pkg]) {
                            shared[pkg] = {
                                singleton: true,
                                requiredVersion: false,
                                eager: true,
                            };
                        }
                    });
                    return shared;
                })(),
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new webpack.DefinePlugin(envKeys),
    ],
};
