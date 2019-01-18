'use strict';

angular
  .module('angularScopesBug', [])
  .controller("WelcomeController", function ($scope) {
    $scope.name = 'Anonymous';

    $scope.getName = function() {
      return $scope.name;
    };
  })
  .controller("EditingController", function($scope) {
    $scope.editMode = false;
    $scope.changeName = function() {
      $scope.editMode = true;
    };
    $scope.closeEditor = function() {
      $scope.editMode = false;
    };
  })
  // Comentário Thiago Nunes 17-01-2019
  // Ocorreu um problema de escopo. Usando $parent eu consigo acessar o escopo certo
  .directive("nameEditor", function () {
    return {
      template: 'Write your name: <input type="text" class="input-name" ng-model="$parent.name">'
    };
  });
