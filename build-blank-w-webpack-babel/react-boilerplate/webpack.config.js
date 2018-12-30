const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader" // Here babel-loader is used to load our JSX/JavaScript files
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"] // css-loader is used to load and bundle all of the CSS files into one file
                // style-loader will add all of the styles inside the style tag of the document.
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
};