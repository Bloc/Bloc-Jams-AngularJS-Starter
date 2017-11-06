(function() {
  function SongPlayer(Fixtures) {

    /**
    * @desc empty object used to make methods of this function public in other linked JS documents
    * @type {object} empty
    */
    var SongPlayer = {};

    /**
    * @desc object used to store album info from Fixtures js file
    * @type {object} containing album info
    */
    var currentAlbum = Fixtures.getAlbum();


    /**
    * @function getSongIndex
    * @desc returns index of song in album
    * @param {object} song
    */
    var getSongIndex = function(song) {
      console.log("getSongIndex of " + song.title + ": " + currentAlbum.songs.indexOf(song) );
      console.log(song.title + song.duration + song.audioUrl);
      console.log(currentAlbum.songs.includes(song) );
      return currentAlbum.songs.indexOf(song);
    };

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
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      SongPlayer.currentSong = song;
    };

    /**
    * @desc variable used to keep track of current song and its play status
    * @type {object} song object (found in fixtures.js)
    */
    SongPlayer.currentSong = null;

    /**
    * @function SongPlayer.play
    * @desc sets songs and plays song if a different song is selected in html doc, plays song if same song is selected but paused
    * @param {object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song){
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song){
        if (currentBuzzObject.isPaused() ) {
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
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    }

    /**
    * @function SongPlayer.previous
    * @desc reduces currentSongIndex by 1, found by invoking getSongIndex function on SongPlayer.currentSong
    */
    SongPlayer.previous = function(){

      var currentSongIndex = getSongIndex(SongPlayer.currentSong);

      console.log(currentSongIndex + "     " + SongPlayer.currentSong.title);
      currentSongIndex--;
      console.log(currentSongIndex);

      if (currentSongIndex < 0){
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
        console.log("Index less than zero!");
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
        console.log("Index not less than zero, play that shit!");
      }
    };

    return SongPlayer;
  }

  angular
  .module('blocJams')
  .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
