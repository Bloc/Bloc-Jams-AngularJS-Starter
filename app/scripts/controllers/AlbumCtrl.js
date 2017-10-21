(function () {
  function AlbumCtrl() {
    this.albumData = albumPicasso;
    for (var i=0; i < 12; i++) {
      this.albumData.push(angular.copy(albumPicasso));
    }
  }

  angular
      .module('blocJams')
      .controller('AlbumCtrl', AlbumCtrl);
})
