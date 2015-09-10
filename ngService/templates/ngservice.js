(function () {
    'use strict';

    angular
        .module('<%= ModuleName %>Services')
        .factory('<%= ServiceName %>', <%= ServiceFunction %>);

    <%= ServiceFunction %>.$inject = ['$http'];

    function <%= ServiceFunction %>($http) {
        var service = {
            GetData: getData
        };

        return service;

        function serviceFunction() { }
    }
})();
