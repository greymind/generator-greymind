var lodash = require('lodash'),
	sprintf = require('sprintf-js').sprintf,
	yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
	constructor: function () {
		yeoman.Base.apply(this, arguments);

		this.argument('DirectiveName', { type: String, required: true });

		this.ModuleName = this.config.get('AppName');
		if (!this.ModuleName) {
			this.argument('ModuleName', { type: String, required: true });
		}

		this.DirectiveName = lodash.camelCase(this.DirectiveName);
	},
	writing: function () {
		var directiveNameKebabCase = lodash.kebabCase(this.DirectiveName);

		this.fs.copyTpl(
			this.templatePath('ngdirective.js'),
			this.destinationPath(sprintf('client/app/directives/%s.js', directiveNameKebabCase)),
			{
				ModuleName: this.ModuleName,
				DirectiveName: this.DirectiveName,
				DirectiveFunction: lodash.capitalize(this.DirectiveName) + 'Directive'
			});
	},
});