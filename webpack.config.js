var path = require("path");

module.exports = {
    watch: false,
    entry: "./src/web-onion.ts",
    output: {
        path: path.resolve(__dirname),
        filename: "web-onion.js"
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [{
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {}
            }]
        },
        {
            test: /\.tsx?$/,
            loader: "ts-loader"
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
        ]
    }
}