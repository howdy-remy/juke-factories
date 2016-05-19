'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, Album, PlayerFactory) {

  $scope.playing = function(){
   return PlayerFactory.isPlaying(); 
  }

  $scope.currentSong = function() {
    return PlayerFactory.getCurrentSong();
  }

  $scope.next = function() {
    return PlayerFactory.next();
  }

  $scope.prev = function() {
    return PlayerFactory.previous();
  }

  $scope.progress = function(){
    return PlayerFactory.getProgress() * 100;
  }

  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause();
      // $rootScope.$broadcast('pause');
    } else PlayerFactory.start(song);
  };

});
