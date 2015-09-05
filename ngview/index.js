var lodash = require('lodash'),
	sprintf = require('sprintf-js').sprintf,
	yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
	constructor: function () {
		yeoman.Base.apply(this, arguments);

		this.argument('ViewName', { type: String, required: true });

		this.ViewName = lodash.camelCase(this.ViewName);
		this.ViewName = lodash.capitalize(this.ViewName);
	},
	writing: function () {
		var viewNameLowerCase = this.ViewName.toLowerCase();

		this.fs.copyTpl(
			this.templatePath('ngview.html'),
			this.destinationPath(sprintf('client/app/%1$s/%1$s.html', viewNameLowerCase)),
			{
				ViewName: this.ViewName,
				ViewControllerName: this.ViewName
			});
	},
});