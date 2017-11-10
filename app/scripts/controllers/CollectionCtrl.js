(function() {
  function CollectionCtrl(Fixtures) {
    this.albums = Fixtures.getCollection(7);
  }
  angular
    .module('blocJams')
    .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();
