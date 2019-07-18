var HtmlWebpackPlugin = require('html-webpack-plugin');

// Webpack is used to compile and bundle all the project files so they're ready to be loaded into a browser, 
// it does this with the help of loaders and plugins that are configured in the webpack.config.js file. 
// The webpack config file also defines a global config object for the application using the externals property, 
// you can also use this to define different config variables for your development and production environments

module.exports = {
    mode: 'development',
    entry: ["babel-polyfill", "./src"],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    // devServer: {
    //     historyApiFallback: true,
    //     proxy: {
    //         '/api': {
    //             target: 'https://node-dat-backend.herokuapp.com/',
    //             changeOrigin: true,
    //             secure: false
    //         }
    //     }
    // },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'https://node-dat-backend.herokuapp.com/api*'
        })
    }
}