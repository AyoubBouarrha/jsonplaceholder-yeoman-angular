'use strict';

/**
 * @ngdoc function
 * @name demineurApp.controller:TodoCtrl
 * @description
 * # TodoCtrl
 * Controller of the demineurApp
 */
angular.module('demineurApp')
  .controller('TodoCtrl', ['$scope','$rootScope', 'postSvc', function ($scope, $rootScope, postSvc) {

    $scope.users = [];
    $scope.todos = [];

    //Recuperation des utilisateurs
    postSvc.getUsers(function (data) {
      $scope.users = data;
      console.log($scope.users);
    });


    //Recuperation des todos par utilisateur
    $scope.getTodosByUser = function (userId) {

      $scope.todos = [];

      if ($rootScope.todosByUser.has(userId)) {
        console.log("Existe déja");
        $scope.todos = $rootScope.todosByUser.get(userId);
      }
      else {
        postSvc.getTodos(function (data) {
          data.forEach(function (todo) {
            if (todo.userId == userId) {
              $scope.todos.push(todo);
            }
          }, this);
          $rootScope.todosByUser.set(userId, $scope.todos);
          console.log($rootScope.todosByUser);
        });
      }
    }

    //Changer l'utilisateur courant
    $scope.changeCurrentUser = function (user) {
      $scope.selectedUser = user.name;
      $scope.getTodosByUser(user.id);
    }

  }]);
