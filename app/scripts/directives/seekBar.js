(function(){
  function seekBar($document) {
    var calculatePercent = function(seekBar, event) { //calculates horizontal percent along seekBar where click event occured
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };

    return {
      templateUrl: '/templates/directives/seek_bar.html', //url from which directive loads a template
      replace: true, //specifies that template loaded above should replace whatever lies between seekBar directive tags in html file
      restrict: 'E', //restricts directive to specific declaration style of element
      scope: { //specifies new scope to be created for this directive
        onChange: '&' //instructs the scope to execute expression in the context of the parent scope
      },
      link: function(scope, element, attributes) { //where DOM listeners, modifiers and majority of directive logic is
        /**
        * @desc variable representing progress in song
        * @type {number}
        */
        scope.value = 0;

//----------------------------------------------------------------------------------------------------------------------------

        /**
        * @desc variable representing total length of song
        * @type {number}
        */
        scope.max = 100;

//----------------------------------------------------------------------------------------------------------------------------

        /**
        * @desc holds element matching seekbar directive as a jq object, allows for calling jq methods on it
        * @type {object}
        */

        var seekBar = $(element);

//----------------------------------------------------------------------------------------------------------------------------
        /**
        * @function attributes.$observe
        * @desc looks for updates to scope attributes defined in first argument passed, updates said value
        * @param {string, function}
        */
        attributes.$observe('value', function(newValue) { //calls angular $observe to check for new values on 'value'
          scope.value = newValue; //... if there is a new value, replace scope.value with it
        });

        attributes.$observe('max', function(newValue) { //same as above, but for 'max' value in scope
          scope.max = newValue;
        });

//----------------------------------------------------------------------------------------------------------------------------
        /**
        * @function percentString
        * @desc Function returning percentage progress through song that is playing for use in rewriting css attributes
        * @returns {string}
        */
        var percentString = function() { //function
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };

//----------------------------------------------------------------------------------------------------------------------------
        /**
        * @function scope.fillStyle
        * @desc returns string containing percent progress through playing song assigned to 'width' attribute, used for updating css styling
        * @return {object}
        */
        scope.fillStyle = function() {
          return { width: percentString() };
        };

//----------------------------------------------------------------------------------------------------------------------------
        /**
        * @function scope.thumbStyle
        * @desc returns string containing percent progress through playing song assigned to 'left' attribute, used for updating css styling
        * @return {object}
        */
        scope.thumbStyle = function() {
          return { left: percentString() };
        };

//----------------------------------------------------------------------------------------------------------------------------
        /**
        * @function scope.onClickSeekBar
        * @desc updates seekBar value based on seek bar's width and where user clicks on the seekbar
        * @param event mousedown
        */
        scope.onClickSeekBar = function(event){
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
          notifyOnChange(scope.value);
        };

//----------------------------------------------------------------------------------------------------------------------------
        /**
        * @function scope.trackThumb
        * @desc function used to track movement of seekBar as user drags it
        * @return {object}
        */
        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) { //(jq) everytime it is sensed that the mouse drags thumb (div in html doc)
            var percent = calculatePercent(seekBar, event); //calculate percent using seekBar element, drag event
            scope.$apply( function() { //update the view when it happens (dragging needs instant updates)
              scope.value = percent * scope.max; //update new scope.value with calculated percent
              notifyOnChange(scope.value); //
            });
          });

          $document.bind('mouseup.thumb', function(){ //each time left click is released on thumb...
            $document.unbind('mousemove.thumb'); //...remove previously defined event handler for mousemove
            $document.unbind('mouseup.thumb'); //Why is this needed?
          });
        };

//----------------------------------------------------------------------------------------------------------------------------
        /**
        * @function notifyOnChange
        * @desc notifys on-change attribute in player_bar.html when a new value is created
        * @param {number} newValue
        */

        var notifyOnChange = function(newValue) {
          if (typeof scope.onChange === 'function') { //checks that argument passed to on-change in html is a function
            scope.onChange({value: newValue}); //if it is a function, replace the value passed in to on-change (diff. from scope.value)
          }
        };

//----------------------------------------------------------------------------------------------------------------------------

      }
    };
  }

  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);
})();
