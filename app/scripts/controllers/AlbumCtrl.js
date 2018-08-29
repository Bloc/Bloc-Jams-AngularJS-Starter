(function() {
  function AlbunCtrl() {
    this.albums = [];
    for (var i = 0; i < 12; i++) {
      this.albums.push(angular.copy(albumPicasso));
    }
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', AlbumCtrl);
})();
