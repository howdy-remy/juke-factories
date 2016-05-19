'use strict';

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, StatsFactory, Album, PlayerFactory) {

  // load our initial data
  // $http.get('/api/albums/')
  Album.fetchOne(0)
  .then(function (album) {
    album.imageUrl = '/api/albums/' + album.id + '/image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      song.albumIndex = i;
    });
    
    $scope.album = album;

    StatsFactory.totalTime($scope.album)
      .then(function(duration) {
        $scope.album.duration = duration/60;
      })
      .then(null, function(err) {
        $log.error('error', err)
      })
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  $scope.playing = function(){
   return PlayerFactory.isPlaying(); 
  }

  $scope.currentSong = function() {
    return PlayerFactory.getCurrentSong();
  }

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause();
      // $rootScope.$broadcast('pause');
    } else PlayerFactory.start(song, $scope.album.songs);

    // $rootScope.$broadcast('play', song);
  };

});

juke.controller('AlbumsCtrl', function ($scope, $rootScope, $log, Album) {
  $scope.albumShow = true;

  $scope.$on('albumShow', function() {
    $scope.albumShow = true;
  })

  $scope.showAlbum = function(id){

    $scope.showOneAlbum = true;

    Album.fetchAll
    .then(function(albums){
      $scope.albums = albums.data
      albums.data.forEach(function(album){
        Album.fetchOne(id)
        .then(function(albumData){
          album.songs = albumData.songs;
        })
      })
    })
  }

})