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
  .directive("nameEditor", function () {
    return {
      template: 'Write your name: <input type="text" ng-model="name">'
    };
  });
