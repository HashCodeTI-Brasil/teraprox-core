const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const webpack = require('webpack');
const path = require('path');
const deps = require('./package.json').dependencies;

require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

const REMOTE_SGP_URL = process.env.REMOTE_SGP_URL || (isProd ? 'https://teraprox-sgp.web.app' : 'http://localhost:3002');
const REMOTE_SGM_URL = process.env.REMOTE_SGM_URL || (isProd ? 'https://teraprox-sgm.web.app' : 'http://localhost:3003');
const REMOTE_SOLICITACAO_URL = process.env.REMOTE_SOLICITACAO_URL || (isProd ? 'https://teraprox-solicitacoes.web.app' : 'http://localhost:3004');
const REMOTE_SGM_OS_URL = process.env.REMOTE_SGM_OS_URL || (isProd ? 'https://teraprox-sgm-os.web.app' : 'http://localhost:4021');
const REMOTE_SGM_OM_URL = process.env.REMOTE_SGM_OM_URL || (isProd ? 'https://teraprox-sgm-om.web.app' : 'http://localhost:4022');
const REMOTE_SGM_UTILS_URL = process.env.REMOTE_SGM_UTILS_URL || (isProd ? 'https://teraprox-sgm-utils.web.app' : 'http://localhost:4023');
const REMOTE_CADERNO_URL = process.env.REMOTE_CADERNO_URL || (isProd ? 'https://teraprox-caderno.web.app' : 'http://localhost:3006');
const REMOTE_ORDEM_CORRECAO_URL = process.env.REMOTE_ORDEM_CORRECAO_URL || (isProd ? 'https://teraprox-ordem-correcao.web.app' : 'http://localhost:3007');
const REMOTE_PLANO_CONTROLE_URL = process.env.REMOTE_PLANO_CONTROLE_URL || (isProd ? 'https://teraprox-plano-controle.web.app' : 'http://localhost:3009');
const REMOTE_SGU_USEROLES_URL = process.env.REMOTE_SGU_USEROLES_URL || (isProd ? 'https://teraprox-sgu-useroles.web.app' : 'http://localhost:4024');

// Collect all REACT_APP_* env vars for DefinePlugin
// Define the entire process.env object so any process.env.* access (static or dynamic)
// is safe in the browser even when vars are not set in the build environment (Webpack 5
// no longer auto-polyfills `process` for browser targets).
const reactAppVars = Object.keys(process.env)
    .filter(key => key.startsWith('REACT_APP_'))
    .reduce((acc, key) => {
        acc[key] = process.env[key];
        return acc;
    }, {});

const envKeys = {
    'process.env': JSON.stringify({
        NODE_ENV: isProd ? 'production' : 'development',
        ...reactAppVars,
    }),
};

// Promise-based remote loader — remotes offline não crasham o Core nem poluem o console.
// Offline: resolvemos com um stub cujo init é no-op (sharing não loga erro) e cujo get
// rejeita com ScriptExternalLoadError somente quando alguém realmente tenta importar
// um módulo — acionando o FederatedErrorBoundary / FederatedUnavailableCard.
function promiseRemote(remoteName, remoteUrl) {
    return `promise new Promise((resolve) => {
        const url = '${remoteUrl}/remoteEntry.js?v=' + Date.now();
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
            resolve({
                get: (request) => window['${remoteName}'].get(request),
                init: (arg) => {
                    try { return window['${remoteName}'].init(arg); }
                    catch(e) { /* already initialized */ }
                }
            });
        };
        script.onerror = () => {
            console.warn('[Federation] Remote ${remoteName} offline (${remoteUrl})');
            resolve({
                __offline: true,
                init: () => {},
                get: () => Promise.reject(Object.assign(
                    new Error('Remote ${remoteName} offline (' + url + ')'),
                    { name: 'ScriptExternalLoadError', request: url }
                ))
            });
        };
        document.head.appendChild(script);
    })`;
}

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
        // Keep host bundles on absolute root path to avoid deep-route 404s
        // like /ordemDeServico/main.hash.js when reloading nested routes.
        publicPath: '/',
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
            remotes: {
                teraprox_app_sgp: promiseRemote('teraprox_app_sgp', REMOTE_SGP_URL),
                teraprox_app_sgm: promiseRemote('teraprox_app_sgm', REMOTE_SGM_URL),
                teraprox_app_solicitacao: promiseRemote('teraprox_app_solicitacao', REMOTE_SOLICITACAO_URL),
                sgm_os: promiseRemote('sgm_os', REMOTE_SGM_OS_URL),
                sgm_om: promiseRemote('sgm_om', REMOTE_SGM_OM_URL),
                sgm_utils: promiseRemote('sgm_utils', REMOTE_SGM_UTILS_URL),
                teraprox_app_caderno: promiseRemote('teraprox_app_caderno', REMOTE_CADERNO_URL),
                teraprox_app_ordem_de_correcao: promiseRemote('teraprox_app_ordem_de_correcao', REMOTE_ORDEM_CORRECAO_URL),
                teraprox_app_plano_de_controle: promiseRemote('teraprox_app_plano_de_controle', REMOTE_PLANO_CONTROLE_URL),
                sgu_useroles: promiseRemote('sgu_useroles', REMOTE_SGU_USEROLES_URL),
            },
            // ─── Shared scope ────────────────────────────────────────────
            // Host (teraprox-core) eagerly carrega a instância singleton de
            // cada pacote compartilhado. Remotes (SGM-OS, SGM-SS, ...) declaram
            // o mesmo conjunto com eager:false e reutilizam as instâncias do host.
            // requiredVersion é derivado do package.json para garantir
            // compatibilidade (Module Federation usa semver-check).
            shared: {
                // ─── Core SDK + UI kits (singletons cross-remote) ────────
                'teraprox-core-sdk': {
                    singleton: true,
                    requiredVersion: '^0.3.0',
                    eager: true,
                },
                'teraprox-ui-kit': {
                    singleton: true,
                    requiredVersion: '^0.2.0',
                    eager: true,
                },
                '@hashcodeti/ui-kit-core': {
                    singleton: true,
                    requiredVersion: '^0.1.0',
                    eager: true,
                },
                '@hashcodeti/ui-kit-sgm': {
                    singleton: true,
                    requiredVersion: '^0.1.0',
                    eager: true,
                },
                // ─── React runtime (explicit versions) ───────────────────
                react: {
                    singleton: true,
                    requiredVersion: deps.react || '^18.2.0',
                    eager: true,
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: deps['react-dom'] || '^18.2.0',
                    eager: true,
                },
                ...(() => {
                    const shared = {};
                    [
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
                                requiredVersion: deps[pkg],
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
