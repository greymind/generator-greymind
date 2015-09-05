var lodash = require('lodash'),
	yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
	constructor: function () {
		yeoman.Base.apply(this, arguments);

		this.argument('FactoryName', { type: String, required: true });

		// Don't camel case the argument
		this.option('nocamel');
		this.FactoryName = (this.options.nocamel ? this.FactoryName : lodash.camelCase(this.FactoryName));

		// Don't capitalize the first letter
		this.option('nocap');
		this.FactoryName = (this.options.nocap ? this.FactoryName : lodash.capitalize(this.FactoryName));
	},
	writing: function () {
		this.fs.copyTpl(
			this.templatePath('ngfactory.js'),
			this.destinationPath(this.FactoryName.toLowerCase() + '.factory.js'),
			{
				ModuleName: this.ModuleName,
				FactoryName: this.FactoryName,
				FactoryFunction: this.FactoryName + 'Factory'
			});
	},
});