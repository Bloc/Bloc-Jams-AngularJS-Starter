(function(){
  function SongPlayer(Fixtures) {

    /**
    * @desc empty songplayer object, returned at end of SongPlayer function to make properties and methods public to other js files
    * @type object
    */

    var SongPlayer = {};

//----------------------------------------------------------------------------------------------------------------------

    /**
    * @desc buzz object
    * @type object
    */

    var currentBuzzObject = null;

//----------------------------------------------------------------------------------------------------------------------

    /**
    * @desc contains entire album
    * @type object
    */

    var currentAlbum = Fixtures.getAlbum();

//----------------------------------------------------------------------------------------------------------------------

    /**
    * @function getSongIndex
    * @desc searches current album for song, returns index of song if found, -1 if not found
    * @param {object} song
    * @return {number}
    */

    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    }

//----------------------------------------------------------------------------------------------------------------------

    /**
    * @function setSong
    * @desc checks if something is already playing, if it is it stops, sets playing attr to null. sets currentBuzzObject to new buzz sound, sets currentSong to song
    * @param {object} song
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
      SongPlayer.currentSong = song;
    }

//---------------------------------------------------------------------------------------------------------------------

    /**
    * @function playSong
    * @desc plays currentBuzzObject, sets song.playing attribute to true
    * @param {object} song
    */

    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    }

//---------------------------------------------------------------------------------------------------------------------

    /**
    * @desc object that stores exact copy of song that is playing (minus additional attribute song.playing)
    * @type {object}
    */

    SongPlayer.currentSong = null;

//---------------------------------------------------------------------------------------------------------------------

    /**
    * @function SongPlayer.play
    * @desc plays song passed to the function
    * @param {object} song
    */

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song){ //if the song that is clicked doesn't equal current song...
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) { //if currentSong = clicked song...
        if (currentBuzzObject.isPaused() ) { //... and if currentSong is paused ...
          playSong(song);
        }
      }
    };

//---------------------------------------------------------------------------------------------------------------------

    /**
    * @function SongPlayer.pause
    * @desc pauses current song. Param only needed when accessed from angular directive not directly bootstrapped to SongPlayer.js
    * @param {object} song
    */

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    }

//---------------------------------------------------------------------------------------------------------------------

    /**
    * @function SongPlayer.previous
    * @desc changes current song to one previous (according to songs index in fixtures.js), and plays it
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

//---------------------------------------------------------------------------------------------------------------------

    /**
    * @function SongPlayer.next
    * @desc changes current song to next song (according to songs index in fixtures.js), and plays it
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

//--------------------------------------------------------------------------------------------------------------------

  return SongPlayer;
}
angular
.module('blocJams')
.factory('SongPlayer', ['Fixtures', SongPlayer]);

})();
