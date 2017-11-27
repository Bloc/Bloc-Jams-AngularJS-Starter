(function() {
     function timecode() {
         return function(seconds) {
         	var seconds = Number.parseFloat(seconds);

         	if (Number.isNaN(seconds)) {
<<<<<<< HEAD
         	return '-:--';
     		}

=======
         		return '-:--';
         	}
>>>>>>> checkpoint-11-filters-fixed
            var wholeSeconds = Math.floor(seconds);
            var minutes = Math.floor(wholeSeconds / 60);
            var remainingSeconds = wholeSeconds % 60;
 
<<<<<<< HEAD
             var output = minutes + ':';
 
             if (remainingSeconds < 10) {
                 output += '0';   
             }
 
             output += remainingSeconds;
             return output;
=======
            var output = minutes + ':';
 
            if (remainingSeconds < 10) {
                 output += '0';   
            }
 
            output += remainingSeconds;
            return output;
>>>>>>> checkpoint-11-filters-fixed
         };
     }
 
     angular
         .module('blocJams')
         .filter('timecode', timecode);
 })();