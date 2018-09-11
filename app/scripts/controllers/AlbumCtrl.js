(function() {
  function AlbumCtrl(Fixtures, SongPlayer) {
<<<<<<< HEAD
    this.albums = [];
    for (var i = 0; i < 12; i++) {
      //this.albums.push(angular.copy(albumPicasso));
      this.albumData = Fixtures.getAlbum();
      this.songPlayer = SongPlayer;
    }
=======
    //this.albums = [];
    //for (var i = 0; i < 12; i++) {
      //this.albums.push(angular.copy(albumPicasso));
      this.albumData = Fixtures.getAlbum();
      this.songPlayer = SongPlayer;
    //}
>>>>>>> CP-Services-Part2
  };

  angular
    .module('blocJams')
<<<<<<< HEAD

    .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
=======
    .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);

>>>>>>> CP-Services-Part2
})();
