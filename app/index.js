/// <reference path="../typings/tsd.d.ts" />

'use strict';

var lodash = require('lodash'),
	sprintf = require('sprintf-js').sprintf,
	yeoman = require('yeoman-generator'),
	chalk = require('chalk'),
	yosay = require('yosay'),
	mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
	constructor: function () {
		yeoman.Base.apply(this, arguments);

		this.argument('AppName', { type: String, required: true });

		// Don't camel case the arguments
		this.option('nocamel');
		this.AppName = this.options.nocamel ? this.AppName : lodash.camelCase(this.AppName);

		// Don't capitalize the first letter
		this.option('nocap');
		this.AppName = this.options.nocap ? this.AppName : lodash.capitalize(this.AppName);
	},
	prompting: function () {
		this.log(yosay(
			'Welcome to the ' + chalk.bgBlue.black.bold('Greymind') + ' generator!'
			));
	},
	configuring: function () {
		this.config.set('AppName', this.AppName);
		this.log('App name set to ' + chalk.blue(this.AppName) + '!');

		function BooleanChalk(bool) {
			return bool ? chalk.green('True') : chalk.red('False');
		}

		this.config.set('nocamel', this.options.nocamel);
		this.log('camelCasing preference set to ' + BooleanChalk(this.options.nocamel));

		this.config.set('nocap', this.options.nocap);
		this.log('Capitalization preference set to ' + BooleanChalk(this.options.nocap));
	},
	writing: function () {
		this.log('Creating app folders...');
		mkdirp('app');
		mkdirp('content/images');
		mkdirp('content/css');
		mkdirp('common');
		mkdirp('lib');
		mkdirp('tests');

		this.AppNameForConfig = lodash.kebabCase(this.AppName);

		this.CopyTemplate = function (fromTo, context) {
			return this.fs.copyTpl(this.templatePath(fromTo), this.destinationPath(fromTo), context);
		}
		
		// Git Ignore
		this.CopyTemplate('.gitignore');
		
		// Npm
		this.CopyTemplate('package.json',
			{
				AppName: this.AppName,
				AppNameForConfig: this.AppNameForConfig
			});
			
		// Bower
		this.CopyTemplate('bower.json', { AppNameForConfig: this.AppNameForConfig });
			
		// Tsd
		this.CopyTemplate('tsd.json');
		
		// Gulp
		this.CopyTemplate('gulpfile.js');
		this.CopyTemplate('gulp-common.js');
		this.CopyTemplate('tasks/copy-lib.js');
		this.CopyTemplate('tasks/bundle-app.js');
		
		// App
		this.CopyTemplate('app/app.js', { AppName: this.AppName });
		
		// Index Controller
		this.CopyTemplate('app/index.controller.js',
			{
				AppName: this.AppName,
				AppTitle: lodash.startCase(this.AppName)
			});
			
		// Index View
		this.CopyTemplate('index.html', { AppName: this.AppName });
			
		// Home
		this.composeWith('greymind:ngcontroller', { args: ['Home'] });
		this.composeWith('greymind:ngview', { args: ['Home'] });
		
		// Content
		this.CopyTemplate('content/images/favicon.png');
		this.CopyTemplate('content/css/app.css');
	},
	install: function () {
		this.installDependencies();
	},
	end: function () {
		this.spawnCommand('./node_modules/.bin/tsd', ['install']);
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