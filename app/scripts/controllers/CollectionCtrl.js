(function() {
    function CollectionCtrl(Fixtures) {
      this.albums = Fixtures.getCollection(12);
  }

    angular
      .module('blocJams')
<<<<<<< HEAD
      .controller('CollectionCtrl', ['Fixtures', CollectionCtrl);
=======
      .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
>>>>>>> CP-Services-Part1
      })();
