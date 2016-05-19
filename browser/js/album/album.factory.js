juke.factory('StatsFactory', function ($q) {
  var statsObj = {};
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});

juke.factory('Album', function($http){
  return {
      fetchAll: $http.get('/api/albums/'),
      fetchOne: function(i) {
        return $http.get('/api/albums/')
            .then(function (res) { return res.data; })
            .then(function (albums) {
              return $http.get('/api/albums/' + albums[i].id);
            })
            .then(function (res) { return res.data; })
          }
        }
});
