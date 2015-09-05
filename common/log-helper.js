var chalk = require('chalk');

module.exports.logError = function (text) {
	console.log(chalk.red('Error: ') + text);
}

module.exports.logWarning = function (text) {
	console.log(chalk.yellow('Warning: ') + text);
}

module.exports.logSuccess = function (text) {
	console.log(chalk.green('Success: ') + text);
}