(function() {
  function AlbumCtrl(Fixtures, SongPlayer) {
    this.albums = [];
    for (var i = 0; i < 12; i++) {
      //this.albums.push(angular.copy(albumPicasso));
      this.albumData = Fixtures.getAlbum();
      this.songPlayer = SongPlayer;
    }
  };

  angular
    .module('blocJams')

    .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();
