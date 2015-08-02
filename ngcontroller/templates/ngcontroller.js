(function () {
    'use strict';

    angular
        .module('<%= ModuleName %>Controllers')
        .controller('<%= ControllerName %>', <%= ControllerFunction %>);

    <%= ControllerFunction %>.$inject = ['$scope']; 

    function <%= ControllerFunction %>($scope) {
        $scope.Title = '<%= ControllerTitle %>';

        activate();

        function activate() { }
    }
})();
