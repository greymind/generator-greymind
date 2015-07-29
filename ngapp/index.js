var lodash = require('lodash'),
	yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
	constructor: function () {
		yeoman.Base.apply(this, arguments);

		this.argument('AppName', { type: String, required: true });

		// Don't camel case the argument
		this.option('nocamel');
		this.AppName = (this.options.nocamel ? this.AppName : lodash.camelCase(this.AppName));

		// Don't capitalize the first letter
		this.option('nocap');
		this.AppName = (this.options.nocap ? this.AppName : lodash.capitalize(this.AppName));
	},
	writing: function () {
		this.fs.copyTpl(
			this.templatePath('ngapp.js'),
			this.destinationPath('app.js'),
			{
				AppName: this.AppName
			}
			);
	},
});