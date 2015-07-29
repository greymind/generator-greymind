var lodash = require('lodash'),
	yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
	constructor: function () {
		yeoman.Base.apply(this, arguments);

		this.argument('FilterName', { type: String, required: true });

		// Don't camel case the argument
		this.option('nocamel');
		this.FilterName = (this.options.nocamel ? this.FilterName : lodash.camelCase(this.FilterName));

		// Don't capitalize the first letter
		this.option('nocap');
		this.FilterName = (this.options.nocap ? this.FilterName : lodash.capitalize(this.FilterName));
	},
	writing: function () {
		this.fs.copyTpl(
			this.templatePath('ngfilter.js'),
			this.destinationPath(this.FilterName.toLowerCase() + '.filter.js'),
			{
				ModuleName: this.ModuleName,
				FilterName: this.FilterName,
				FilterFunction: this.FilterName + 'Filter'
			}
			);
	},
});