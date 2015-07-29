(function () {
    'use strict';

    angular
        .module('<%= ModuleName %>Filters')
        .Filter('<%= FilterName %>', <%= FilterFunction %>);

    function <%= FilterFunction %>() {
        return function (input) {
            return input;
        };
    }
})();
