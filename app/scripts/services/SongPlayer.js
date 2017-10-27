(function() {
    function SongPlayer() {
         var SongPlayer = {};


         /**
         * @desc Buzz object audio file
         * @type {Object}
         */

         var currentBuzzObject = null;

         /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            };

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
         };

         var playSong = function(song) {
           currentBuzzObject.play();
           song.playing = true;
         }

         /**
          * @desc Active song object from list of songs
          * @type {Object}
          */

         SongPlayer.currentSong = null;

         SongPlayer.play = function(song) {
           song = song || SongPlayer.currentSong;
           if (SongPlayer.currentSong !== song) {
            setSong(song);
            playSong(song);
          } else if (SongPlayer.currentSong === song) {
              setSong(song);

              if (currentBuzzObject.isPaused()) {
                playSong(song);
              }
            }
        };

        SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          currentBuzzObject.pause();
          song.playing = false;
        };


         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
