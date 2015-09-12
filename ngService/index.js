var lodash = require('lodash'),
  sprintf = require('sprintf-js').sprintf,
  yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('ServiceName', { type: String, required: true });

    this.ModuleName = this.config.get('AppName');
    if (!this.ModuleName) {
      this.argument('ModuleName', { type: String, required: true });
    }

    this.ServiceName = lodash.camelCase(this.ServiceName);
  },
  writing: function () {
    var serviceNameKebabCase = lodash.kebabCase(this.ServiceName);

    this.fs.copyTpl(
      this.templatePath('ngservice.js'),
      this.destinationPath(sprintf('client/app/services/%s.js', serviceNameKebabCase)),
      {
        ModuleName: this.ModuleName,
        ServiceName: this.ServiceName,
        FactoryFunction: lodash.capitalize(this.ServiceName) + 'Factory'
      });
  },
});