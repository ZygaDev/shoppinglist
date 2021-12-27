const webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		bootstrap: ["bootstrap-loader"],
		index: ["./src/index", "./src/index.scss"],
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "assets/js/[name].bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
			{
				test: /\.(sc|sa|c)ss$/,
				exclude: /node_modules/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
			},

			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: ["file-loader?name=assets/images/[name].[ext]", "image-webpack-loader"],
			},
			{
				test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: "url-loader?limit=10000&name=fonts/[name].[ext]",
			},
			{
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				use: "file-loader?name=fonts/[name].[ext]",
			},
			// Bootstrap 4
			{
				test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/,
				loader: "imports-loader?jQuery=jquery",
			},
		],
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000,
		stats: "errors-only",
		open: true,
		hot: true,
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			Popper: ["popper.js", "default"],
		}),
		new webpack.ProvidePlugin({
			"window.Tether": "tether",
		}),
		new HtmlWebpackPlugin({
			title: "React 101",
			hash: true,
			template: path.join(__dirname, "src/index.html"),
		}),
		new MiniCssExtractPlugin({
			filename: "./assets/css/[name].css",
		}),
		new CleanWebpackPlugin(),
	],
};
