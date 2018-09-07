(function() {
     function SongPlayer() {
          var SongPlayer = {};

          SongPlayer.play = function(song) {
                   var currentBuzzObject = new buzz.sound(song.audioUrl, {
                       formats: ['mp3'],
                       preload: true
                   });

                   currentBuzzObject.play();
               };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
