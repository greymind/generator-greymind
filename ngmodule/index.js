var lodash = require('lodash'),
  yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('ModuleName', { type: String, required: true });

    // Don't camel case the argument
    this.option('nocamel');
    this.ModuleName = (this.options.nocamel ? this.ModuleName : lodash.camelCase(this.ModuleName));

    // Don't capitalize the first letter
    this.option('nocap');
    this.ModuleName = (this.options.nocap ? this.ModuleName : lodash.capitalize(this.ModuleName));
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('ngmodule.js'),
      this.destinationPath(this.ModuleName.toLowerCase() + '.module.js'),
      {
        ModuleName: this.ModuleName
      });
  },
});