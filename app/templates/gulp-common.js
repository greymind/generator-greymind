var fs = require('fs');
var beautify = require('js-beautify');

// Paths
var paths = {};
paths.Home = "./";

paths.Node = "node_modules/"
paths.Bower = "bower_components/";

paths.Client = "client/"

paths.Dist = paths.Client + "dist/";
paths.DistApp = paths.Dist + "app/";
paths.DistLib = paths.Dist + "lib/";

paths.App = paths.Client + "app/";
paths.Services = paths.App + "services/";
paths.Directives = paths.App + "directives/";

paths.Content = paths.Client + "content/";
paths.Css = paths.Content + "css/";
paths.Sass = paths.Content + "sass/";

paths.Server = "server/"

module.exports.Paths = paths;

// Beautify and write HTML to file
module.exports.WriteHtml = function (filePath, html, cb) {
	var file = fs.createWriteStream(filePath);
    file.write(beautify.html(html, {}));
    file.end(function () {
		cb();
	});
}