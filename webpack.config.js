const path = require('path'); //es podderj vsemi
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const sass = require('./webpack/sass');
const fonts = require('./webpack/fonts');
const images = require('./webpack/images');
const common = merge([
    {
        entry: {
            'index': PATHS.source + '/pages/index.js',
        },
        output: {
            path: PATHS.build,
            filename: '[name].js'
        },
        plugins: [
             new HtmlWebpackPlugin({
                 filename: 'index.html',
                 chunks: ['index'],
                 template: PATHS.source + '/pages/index.pug'
             }),

        ],
    },
    pug(),
    sass(),
    fonts(),
    images()
]);


const developmentConfig = {
    devServer: {
        open: true, // Here
        //openPage: './build/Form-Elements.html' // And here
      },
};

module.exports = function(env) {
    if (env === 'production'){
        return common;
    }
    if (env === 'development'){
        return Object.assign(
            {},
            common,
            developmentConfig
        )
    }
    // if (env === 'development'){
    //     return Object.assign(
    //         {},
    //         common,
    //         developmentConfig,
    //         pug(),
    //         sass()
    //     )
    // }
}