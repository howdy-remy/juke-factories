'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, Album, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // // var audio = document.createElement('audio');

  
  // state
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


  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause();
      // $rootScope.$broadcast('pause');
    } else PlayerFactory.start(song);
  };

  $scope.progress = function(){
    return PlayerFactory.getProgress() * 100;
  }

  // incoming events (from Album or toggle)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);

  // functionality
  // function pause () {
    
  // }
  // function play (){
    
  // }

  // outgoing events (to Album… or potentially other characters)
  // $scope.next = function () {  };
  // $scope.prev = function () {  };

});
