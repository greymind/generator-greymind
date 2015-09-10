var lodash = require('lodash'),
	sprintf = require('sprintf-js').sprintf,
	yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
	constructor: function () {
		yeoman.Base.apply(this, arguments);

		this.argument('ControllerName', { type: String, required: true });

		this.ModuleName = this.config.get('AppName');
		if (!this.ModuleName) {
			this.argument('ModuleName', { type: String, required: true });
		}

		this.ControllerName = lodash.camelCase(this.ControllerName);
		this.ControllerName = lodash.capitalize(this.ControllerName);
	},
	writing: function () {
		var controllerNameKebabCase = lodash.kebabCase(this.ControllerName);

		this.fs.copyTpl(
			this.templatePath('ngcontroller.js'),
			this.destinationPath(sprintf('client/app/%1$s/%1$s.controller.js', controllerNameKebabCase)),
			{
				ModuleName: this.ModuleName,
				ControllerName: this.ControllerName,
				ControllerTitle: lodash.startCase(this.ControllerName),
				ControllerFunction: this.ControllerName + 'Controller'
			});
	},
});