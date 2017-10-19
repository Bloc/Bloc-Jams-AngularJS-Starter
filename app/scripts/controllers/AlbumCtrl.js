(function(){
  function AlbumCtrl(){
    this.albumData = albumPicasso;
    this.songs = [];
    for (var i = 0; i < albumPicasso.songs.length; i++){
      this.songs.push(angular.copy(this.albumData.songs[i]))
    }
    console.log(this.songs);
  }
  angular
    .module('blocJams')
    .controller('AlbumCtrl', AlbumCtrl)
})();
