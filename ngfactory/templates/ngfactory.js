(function () {
    'use strict';

    angular
        .module('<%= ModuleName %>Factories')
        .factory('<%= FactoryName %>', <%= FactoryFunction %>);

    <%= FactoryFunction %>.$inject = ['$http']; 

    function <%= FactoryFunction %>($http) {
        var service = {
            ServiceFunction: ServiceFunction
        };

        return service;

        function ServiceFunction() { }
    }
})();
