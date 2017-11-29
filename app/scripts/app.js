'use strict';

/**
 * @ngdoc overview
 * @name demineurApp
 * @description
 * # demineurApp
 *
 * Main module of the application.
 */
angular
  .module('demineurApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .factory('postSvc', ['$http', function ($http) {
    var factory = {};

    factory.getPosts = function (callback) {
      var endPoint = "https://jsonplaceholder.typicode.com/posts"
      $http.get(endPoint).then(function (response) {
        callback(response.data);
      });
    }

    factory.getUserById = function (callback, idUser) {
      var endPoint = "https://jsonplaceholder.typicode.com/users/" + idUser
      $http.get(endPoint).then(function (response) {
        callback(response.data);
      });
    }

    factory.getUsers = function (callback, idUser) {
      var endPoint = "https://jsonplaceholder.typicode.com/users"
      $http.get(endPoint).then(function (response) {
        callback(response.data);
      });
    }

    factory.getTodos = function (callback, idUser) {
      var endPoint = "https://jsonplaceholder.typicode.com/todos"
      $http.get(endPoint).then(function (response) {
        callback(response.data);
      });
    }

    return factory;

  }])
  .directive("todo", function () {
    return {
      template: `   
      <h3>Listes des TODOS:</h3>
      <br>
      <div ng-repeat="todo in todos" class="line-todo">         
        <span class="title">{{todo.title}} </span>   
        <label><input type="checkbox" ng-model="todo.completed" ng-change="changeTodoStatut(todo)" title="Accomplie"  > Accomplie <label>       
      </div>      
      `
    };
  })
  .run(function ($rootScope) {    
    //propriete publique à pour maintenir la listes des todos jusqu'à l'actualisation de la page
    $rootScope.todosByUser = new Map();
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/mine', {
        templateUrl: 'views/mine.html',
        controller: 'MineCtrl',
        controllerAs: 'mine'
      })
      .when('/posts', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl',
        controllerAs: 'posts',
      })
      .when('/todo', {
        templateUrl: 'views/todo.html',
        controller: 'TodoCtrl',
        controllerAs: 'todo'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
