const path = require("path");

module.exports = {
	mode: "development",
	output: {
		path: path.resolve(__dirname, "dist/"),
		filename: "app.js",
	},
	node: {
		fs: 'empty'
	}
};