const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
    entry: './src/index.js',
    mode: 'development',
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
                './useInjectReducer': './src/hooks/useInjectReducer',
                './useWebInterface': './src/Services/http/webInterface',
            },
            remotes: {
                teraprox_app_sgp: `teraprox_app_sgp@${process.env.REMOTE_SGP_URL || 'http://localhost:3002'}/remoteEntry.js`,
                teraprox_app_sgm: `teraprox_app_sgm@${process.env.REMOTE_SGM_URL || 'http://localhost:3003'}/remoteEntry.js`,
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
                    ].forEach(pkg => {
                        if (deps[pkg]) {
                            shared[pkg] = {
                                singleton: true,
                                requiredVersion: false,
                                eager: false,
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
    ],
};
