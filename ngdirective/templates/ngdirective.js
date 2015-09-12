(function () {
  'use strict';

  angular
    .module('<%= ModuleName %>Directives')
    .directive('<%= DirectiveName %>', <%= DirectiveFunction %>);

  <%= DirectiveFunction %>.$inject = ['$window'];

  function <%= DirectiveFunction %>($window) {
    // Usage:
    //     <directive></directive>
    // Creates:
    // 
    var directive = {
      link: link,
      restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
    }
  }
})();