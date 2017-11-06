(function() {
  function SongPlayer() {

    /**
    * @desc empty object used to make methods of this function public in other linked JS documents
    * @type {object} empty
    */
    var SongPlayer = {};

    /**
    * @desc variable used to keep track of current song and its play status
    * @type {object} song object (found in fixtures.js)
    */
    var currentSong = null;

    /**
    * @desc Buzz object audio file
    * @type {object} containing file to be played
    */
    var currentBuzzObject = null;

    /**
    * @function playSong
    * @desc function that will play a specific song, set status of song object to playing
    * @param {object} song
    */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    };

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
    * @function SongPlayer.play
    * @desc sets songs and plays song if a different song is selected in html doc, plays song if same song is selected but paused
    * @param {object} song
    */
    SongPlayer.play = function(song) {
      if (currentSong !== song){
        setSong(song);
        playSong(song);
      } else if (currentSong === song){
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    /**
    * @function SongPlayer.pause
    * @desc pauses currently playing song, sets status of song.playing attribute to false
    * @param {object} song
    */
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    }

    return SongPlayer;
  }

  angular
  .module('blocJams')
  .factory('SongPlayer', SongPlayer);
})();
