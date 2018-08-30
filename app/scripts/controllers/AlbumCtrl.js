(function() {
  function AlbumCtrl(Fixtures) {
    this.albums = [];
    for (var i = 0; i < 12; i++) {
      //this.albums.push(angular.copy(albumPicasso));
       this.albumData = Fixtures.getAlbum();
    }
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
