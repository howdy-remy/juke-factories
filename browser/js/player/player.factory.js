'use strict';

juke.factory('PlayerFactory', function ($log, $rootScope) {
  var audio = document.createElement('audio');
  window.a = audio
  var playing = false;
  var currentSong;
  var songList;

  function mod(num, m) {
    return ((num % m) + m) % m;
  };
  var skip = function(interval) {
    if (!currentSong) return;
    console.log('in player factory', songList)
    var index = songList.indexOf(currentSong);
    index = mod((index + (interval || 1)), songList.length);

    return songList[index];
  }

  audio.addEventListener('ended', function () {
    playerControls.next();
    $rootScope.$evalAsync();
  })

  audio.addEventListener('timeupdate', function() {
    $rootScope.$evalAsync();
		return playerControls.getProgress()
  })

  var playerControls = {
    start: function(song, sl) {
      this.pause();
      if (sl) songList = sl

      if (song !== currentSong) {
        audio.src = song.audioUrl;
        audio.load()
        currentSong = song
      } 

      audio.play();
      playing = true;
    },
    pause: function() {
      audio.pause();
      playing = false;
    },
    resume: function(song) {
      audio.play();
      playing = true;
    },
    isPlaying: function() {
      return playing;
    },
    getCurrentSong: function() {
      return currentSong || null;
    },
    next: function() {
      this.pause();
      this.start(skip(1))
    },
    previous: function() {
      this.pause();

      this.start(skip(-1))
    },
    getProgress: function() {
      if (!currentSong) return 0;
      return audio.currentTime / audio.duration;
    }
  }
  return playerControls;
});
