(function() {
  function timecode() {
    return function(seconds) {
      return buzz.toTimer(seconds);
    };
  }

  angular
    .module('blocJams')
    .filter('timecode', timecode);
})();
