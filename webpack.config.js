var path = require("path");

module.exports = {
    watch: true,
    entry: "./src/demo/demo.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
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