(function () {
  'use strict';

  angular
    .module('<%= AppName %>')
    .controller('Index', IndexController);

  IndexController.$inject = ['$scope'];

  function IndexController($scope) {
    $scope.Title = '<%= AppTitle %>';
  }
})();
