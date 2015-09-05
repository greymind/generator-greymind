var lodash = require('lodash'),
	yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
	constructor: function () {
		yeoman.Base.apply(this, arguments);

		this.argument('DirectiveName', { type: String, required: true });

		// Don't camel case the argument
		this.option('nocamel');
		this.DirectiveName = (this.options.nocamel ? this.DirectiveName : lodash.camelCase(this.DirectiveName));

		// Don't capitalize the first letter
		this.option('nocap');
		this.DirectiveName = (this.options.nocap ? this.DirectiveName : lodash.capitalize(this.DirectiveName));
	},
	writing: function () {
		this.fs.copyTpl(
			this.templatePath('ngdirective.js'),
			this.destinationPath(this.DirectiveName.toLowerCase() + '.directive.js'),
			{
				ModuleName: this.ModuleName,
				DirectiveName: this.DirectiveName,
				DirectiveFunction: this.DirectiveName + 'Directive'
			});
	},
});