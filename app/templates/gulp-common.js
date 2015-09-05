var fs = require('fs');
var beautify = require('js-beautify');

// Paths
var paths = {};
paths.Home = "./";
paths.Bower = "./bower_components/";
paths.Lib = "./lib/";
paths.Client = "./"
paths.App = paths.Client + "app/";
paths.Factories = paths.App + "factories/";
global.paths = paths;

module.exports.Paths = paths;

// Beautify and write HTML to file
module.exports.WriteHtml = function (filePath, html, cb) {
	var file = fs.createWriteStream(filePath);
    file.write(beautify.html(html, {}));
    file.end(function () {
		cb();
	});
}