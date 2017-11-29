'use strict';

/**
 * @ngdoc function
 * @name demineurApp.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller of the demineurApp
 */
angular.module('demineurApp')
  .controller('PostsCtrl', ['$scope', 'postSvc', function ($scope, postSvc) {
    $scope.posts = [];

    //Recuperation des posts
    postSvc.getPosts(function (data) {
      $scope.posts = data;
      //ajout du nom du createur pour chaque post
      $scope.posts.forEach(function (post) {
        //recuperation du nom du createur
        postSvc.getUserById(function (data) {
          //ajout du nom du createur au post
          post.nomCreateur = data.name;
        }, post.userId);
      }, this);
      console.log($scope.posts);
    });

    $scope.monTri = function (x) {
      $scope.monTriPar = x;
    }

  }]);
