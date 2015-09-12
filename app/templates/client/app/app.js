(function () {
  'use strict';

  var <%= AppName %>App = angular.module('<%= AppName %>', [
  // Angular modules
    'ngRoute',
        
  // Custom modules
    '<%= AppName %>Modules',
    '<%= AppName %>Controllers',
    '<%= AppName %>Services',
    '<%= AppName %>Directives',
    '<%= AppName %>Filters',
        
    // 3rd Party Modules
        
  ]);

  angular.module('<%= AppName %>Modules', []);
  angular.module('<%= AppName %>Controllers', []);
  angular.module('<%= AppName %>Services', []);
  angular.module('<%= AppName %>Directives', []);
  angular.module('<%= AppName %>Filters', []);

  ConfigFunction.$inject = ['$routeProvider', '$httpProvider', '$locationProvider'];

  function ConfigFunction($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'app/home/home.html'
      })
      .otherwise({
        redirectTo: '/home'
      });

    //$httpProvider.interceptors.push('Interceptor');
    //$locationProvider.html5Mode(true);
  }

  <%= AppName %>App.config(ConfigFunction);

})();