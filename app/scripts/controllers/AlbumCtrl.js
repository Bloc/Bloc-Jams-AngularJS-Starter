(function(){
  function AlbumCtrl(Fixtures){
    this.albumData = Fixtures.getAlbum();
    this.songs = [];
    for (var i = 0; i < this.albumData.songs.length; i++){
      this.songs.push(angular.copy(this.albumData.songs[i]))
    }

  }
  angular
    .module('blocJams')
    .controller('AlbumCtrl', ['Fixtures', AlbumCtrl])
})();
