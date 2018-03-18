var app = angular.module("forumApp", []);

app.controller("formController", ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope)  {
    $scope.formInfo = {};
    $scope.addMessage = function() {

        var data = {
            title: $scope.formInfo.title,
            body : $scope.formInfo.body
        };

        $http.post('http://localhost:3000/message', data)
            .then(
                function(response){
                    $scope.formInfo = {};
                    $rootScope.$broadcast('addingMessage', {});
                },
                function (error) {
                    console.log(error);
                }
            );
    };

}]);


app.controller("messagesController", ['$scope', '$http', function($scope, $http)  {
    $scope.messages = {};
    $scope.messagesCount = $scope.messages.length;
    $scope.getMessages = function() {
        $http({
            method : "GET",
            url : "http://localhost:3000/message"
        }).then(function (response) {
            $scope.messages = response.data;
            $scope.messagesCount = $scope.messages.length;
        }, function (response) {
            console.log(response.statusText);
        });
    };

    $scope.$on('addingMessage', function (event, data) {
        $scope.getMessages();
    });

    $scope.getMessages();
}]);