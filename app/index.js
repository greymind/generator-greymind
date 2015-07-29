'use strict';

var lodash = require('lodash'),
	yeoman = require('yeoman-generator'),
	chalk = require('chalk'),
	yosay = require('yosay');

module.exports = yeoman.Base.extend({
	constructor: function () {
		yeoman.Base.apply(this, arguments);

		this.argument('ModuleName', { type: String, required: true });

		// Don't camel case the arguments
		this.option('nocamel');
		if (this.options.nocamel) {
			this.ModuleName = lodash.camelCase(this.ModuleName);
		}

		// Don't capitalize the first letter
		this.option('nocap');
		if (this.options.nocap)
		{
			this.ModuleName = lodash.capitalize(this.ModuleName);
		}
	},
	prompting: function () {
		this.log(yosay(
			'Welcome to the ' + chalk.bgBlue.black.bold('Greymind') + ' generator!'
			));
	},
	configuring: function () {
		this.log(yosay('Module name set to ' + chalk.blue(this.ModuleName) + '!'));
		this.config.set('ModuleName', this.ModuleName);
		
		function BooleanChalk(bool) {
			return bool ? chalk.green('True') : chalk.red('False');
		}
		
		this.log(yosay('camelCasing preference set to ' + BooleanChalk(this.options.nocamel) + '!'));
		this.config.set('nocamel', this.options.nocamel);
		
		this.log(yosay('Capitalization preference set to ' + BooleanChalk(this.options.nocap) + '!'));
		this.config.set('nocap', this.options.nocap);
	}
});

// initializing - Your initialization methods (checking current project state, getting configs, etc)
// prompting - Where you prompt users for options (where you'd call this.prompt())
// configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
// default
// writing - Where you write the generator specific files (routes, controllers, etc)
// conflicts - Where conflicts are handled (used internally)
// install - Where installation are run (npm, bower)
// end - Called last, cleanup, say good bye, etc