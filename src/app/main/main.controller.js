'use strict';

angular.module('facebookFeed')
  .controller('MainCtrl', function($scope, $http) {
    $scope.getGraph = function(facebook_url) {
      $http.get(encodeURI('https://graph.facebook.com/' + facebook_url))
        .success(successCallback)
        .error(errorCallback);
    }

    function successCallback(data, status) {
      $scope.rep = data;
      $scope.facebook_id = data['id'];
      $scope.error = data['error'];
    }

    // {
    //    "error": {
    //       "message": "Unsupported get request. Please read the Graph API documentation at https://developers.facebook.com/docs/graph-api",
    //       "type": "GraphMethodException",
    //       "code": 100
    //    }
    // }



    function errorCallback(data, status) {

    }

    var client = new ZeroClipboard(document.getElementById("copy-button"));

    client.on("ready", function(readyEvent) {
      // alert( "ZeroClipboard SWF is ready!" );

      client.on("aftercopy", function(event) {
        // `this` === `client`
        // `event.target` === the element that was clicked
        // event.target.style.display = "none";
        // alert("Copied text to clipboard: " + event.data["text/plain"]);
      });
    });

  });
