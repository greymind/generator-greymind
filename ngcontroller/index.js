var lodash = require('lodash'),
	sprintf = require('sprintf-js').sprintf,
	yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
	constructor: function () {
		yeoman.Base.apply(this, arguments);

		this.argument('ControllerName', { type: String, required: true });
		
		this.ModuleName = this.config.get('AppName');
		if (!this.ModuleName)
		{
			this.argument('ModuleName', { type: String, required: true });
		}

		// Don't camel case the argument
		this.option('nocamel');
		this.ControllerName = (this.options.nocamel ? this.ControllerName : lodash.camelCase(this.ControllerName));

		// Don't capitalize the first letter
		this.option('nocap');
		this.ControllerName = (this.options.nocap ? this.ControllerName : lodash.capitalize(this.ControllerName));
	},
	writing: function () {
		var controllerNameLowerCase = this.ControllerName.toLowerCase();

		this.fs.copyTpl(
			this.templatePath('ngcontroller.js'),
			this.destinationPath(sprintf('app/%1$s/%1$s.controller.js', controllerNameLowerCase)),
			{
				ModuleName: this.ModuleName,
				ControllerName: this.ControllerName,
				ControllerTitle: lodash.startCase(this.ControllerName),
				ControllerFunction: this.ControllerName + 'Controller'
			});
	},
});