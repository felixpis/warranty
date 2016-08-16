/* global __dirname, process */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const configFile = require('./config.json');
const appPath = path.join(__dirname, 'src');
const bowerPath = path.join(__dirname, 'bower_components');
const distPath = path.join(__dirname, 'dist');
const exclude = /node_modules|bower_components/;

function getENVReplacements() {
    const replacements = configFile[process.env.NODE_ENV.trim()];
    const result = {};

    /* eslint-disable angular/json-functions */
    Object.keys(replacements)
        .forEach((key) => result[key] = JSON.stringify(replacements[key]));

    return result;
}

const config = {

    // The base directory for resolving `entry` (must be absolute path)
    context: appPath,

    entry: {
        app: 'app.js',
        vendor: [
            'angular',
            'angular-ui-router',
            'angular-ui-bootstrap',
            'imports?module=>null,define=>null!ng-flow/dist/ng-flow-standalone',

            'bootstrap/dist/css/bootstrap.css',
            'bootstrap/dist/css/bootstrap-theme.css',
            'font-awesome/css/font-awesome.css'
        ]
    },

    output: {
        path: distPath,
        publicPath: '/',
        filename: '[name]-bundle.[hash].js'
    },

    plugins: [

        // Generate index.html with included script tags
        new HtmlWebpackPlugin({
            inject: 'body',
            template: 'src/index.html'
        }),

        // Remove build related folders
        new CleanPlugin(['dist']),
        
        // Do not output to dist if there are errors
        new webpack.NoErrorsPlugin(),

        // Global replacements for each environment
        new webpack.DefinePlugin(getENVReplacements())
    ],

    // Enable loading modules relatively (without the ../../ prefix)
    resolve: {
        root: [appPath, bowerPath]
    },

    module: {
        loaders: [

            // Transpile ES6 and annotate AngularJS dependencies
            {
                test: /\.js$/,
                loaders: [
                    'ng-annotate',
                    'babel'
                ],
                exclude
            },

            // SCSS
            {
                test: /\.(css)$/,
                loaders: [
                    'style',
                    'css',
                    'autoprefixer'
                ]
            },

            // JSON
            {
                test: /\.json$/,
                loader: 'json',
                exclude
            },

            // Allow `require`ing image/font files (also when included in CSS)
            // Inline assets under 5kb as Base64 data URI, otherwise uses `file-loader`
            {
                test: /\.(eot|woff2?|ttf|otf)(\?.*)?$/i,
                loader: 'url?limit=5120&name=[path][name].[hash].[ext]'
            },

            {
                test: /\.(jpe?g|png|gif|svg)(\?.*)?$/i,
                loader: 'url?limit=5120&name=[path][name].[hash].[ext]'
            },

            // Create AngularJS templates from HTMLs
            {
                test: /\.html$/,
                loaders: [
                    `ngtemplate?relativeTo=${appPath}`,
                    'html'
                ]
            }
        ]
    },

    // Settings for webpack-dev-server
    // `--hot` and `--progress` must be set using CLI
    devServer: {
        contentBase: './src',
        noInfo: false,
        inline: true,
        historyApiFallback: true
    }

};

if (process.env.NODE_ENV.trim() === 'development') {
    config.devtool = '#inline-source-map';
}

if (process.env.NODE_ENV !== 'test') {
    config.plugins.push(
        new webpack.optimize.CommonsChunkPlugin(
            /* chunkName: */ 'vendor',
            /* filename: */ 'vendor.[hash].js'
        )
    );
}

module.exports = config;
