var lodash = require('lodash'),
	yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
	constructor: function () {
		yeoman.Base.apply(this, arguments);

		this.argument('ControllerName', { type: String, required: true });

		// Don't camel case the argument
		this.option('nocamel');
		this.ControllerName = (this.options.nocamel ? this.ControllerName : lodash.camelCase(this.ControllerName));

		// Don't capitalize the first letter
		this.option('nocap');
		this.ControllerName = (this.options.nocap ? this.ControllerName : lodash.capitalize(this.ControllerName));
	},
	writing: function () {
		this.fs.copyTpl(
			this.templatePath('ngcontroller.js'),
			this.destinationPath(this.ControllerName.toLowerCase() + '.controller.js'),
			{
				ModuleName: this.ModuleName,
				ControllerName: this.ControllerName,
				ControllerTitle: lodash.startCase(this.ControllerName),
				ControllerFunction: this.ControllerName + 'Controller'
			}
			);
	},
});