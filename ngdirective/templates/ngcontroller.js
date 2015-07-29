(function () {
    'use strict';

    angular
        .module('<%= ModuleName %>Directives')
        .controller('<%= ControllerName %>', <%= ControllerFunction %>);

    <%= ControllerFunction %>.$inject = ['$scope']; 

    function <%= ControllerFunction %>($scope) {
        $scope.title = '<%= ControllerTitle %>';

        activate();

        function activate() { }
    }
})();
