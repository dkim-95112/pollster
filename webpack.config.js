module.exports = {
	//devtool: 'eval-source-map',
	devtool: 'inline-source-map',
	entry: __dirname + "/app.js",
	output: {
		path: __dirname + "/build",
		filename: "bundle.js"
	},

	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react']
			}
		}]
	}
}