const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname,'./src/app.js'),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname,'public')
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public')
    },

    resolve: {
        fallback: { "buffer": false },
        fallback: { "path": false },
        fallback: { "zlib": false }
    }

};
