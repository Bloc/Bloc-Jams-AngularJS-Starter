(function() {
     function SongPlayer() {
          var SongPlayer = {};
		/**
 		* @desc Current Song title
		* @type {Object}
 		*/ 
		var currentSong = null;
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
        		currentSong.playing = null;
    		}

    		currentBuzzObject = new buzz.sound(song.audioUrl, {
        	formats: ['mp3'],
       		preload: true
    		});

    		currentSong = song;
		};
		/**
		* @function playSong
 		* @desc Plays song and sets if a song is playing to true
 		* @param {Object} song
 		*/
 		var playSong = function (song) {
 			currentBuzzObject.play();
 			song.playing = true;
 		}
 		/**
		* @function songPlayer.play
 		* @desc Sets and plays a new song if a different song is playing, or plays the song if it is paused
 		* @param {Object} song
 		*/

        SongPlayer.play = function(song) {
        	if (currentSong !== song) {
             	setSong(song);
         		playSong(song);  
            } else if (currentSong === song) {
         	if (currentBuzzObject.isPaused()) {
             playSong(song);  
        	 }
    		}         
     	};
     	/**
		* @function songPlayer.pause
 		* @desc Pauses song if song a song is playing and sets attribute to false
 		* @param {Object} song
 		*/
     	SongPlayer.pause = function(song) {
     		currentBuzzObject.pause();
     		song.playing = false;
 		};
          
          return SongPlayer;
    }
     	angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
})();