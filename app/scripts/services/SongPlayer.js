(function() {
     function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        /**
 		* @desc Setting current album to store album information
		* @type {Object}
 		*/
        var currentAlbum = Fixtures.getAlbum();
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
    		}

    		currentBuzzObject = new buzz.sound(song.audioUrl, {
        	formats: ['mp3'],
       		preload: true
    		});

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
    		SongPlayer.currentSong = song;

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
        * @function stopSong
        * @desc Stops song ans sets it to null
        * @param {Object} song
        */
        var stopSong = function (song) {
            currentBuzzObject.stop();
            song.playing = null;
        }
		/**
		* @function getSongIndex
 		* @desc Returns index of a song
 		* @param {Object} song
 		*/
 		var getSongIndex = function(song) {
     	return currentAlbum.songs.indexOf(song);
 		};
		/**
 		* @desc Current Song title
		* @type {Object}
 		*/ 
		SongPlayer.currentSong = null;
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.volume = 100;

 		/**
		* @function songPlayer.play
 		* @desc Sets and plays a new song if a different song is playing, or plays the song if it is paused
 		* @param {Object} song
 		*/
        SongPlayer.play = function(song) {
        	song = song || SongPlayer.currentSong;
        	if (SongPlayer.currentSong !== song) {
             	setSong(song);
         		playSong(song);  
            } else if (SongPlayer.currentSong === song) {
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
     		song = song || SongPlayer.currentSong;
     		currentBuzzObject.pause();
     		song.playing = false;
 		};
 		/**
		* @function songPlayer.previous
 		* @desc Song changes to the previous song
 		* @param {Object} song
 		*/
        SongPlayer.previous = function() {
     		var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     		currentSongIndex--;

     		if (currentSongIndex < 0) {
         		currentBuzzObject.stop();
         		SongPlayer.currentSong.playing = null;
         	} else {
         		var song = currentAlbum.songs[currentSongIndex];
         		setSong(song);
         		playSong(song);
     		}
 		};
        /**
        * @function songPlayer.next
        * @desc Song changes to the next song
        * @param {Object} song
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex >= currentAlbum.songs.length) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
            currentBuzzObject.setTime(time);
            }
        };

        SongPlayer.setTheVolume = function(volume){
            if (currentBuzzObject){
            currentBuzzObject.setVolume(volume);
            }
        };
 		return SongPlayer;
    }
     	angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();