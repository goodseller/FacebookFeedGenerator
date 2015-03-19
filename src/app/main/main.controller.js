'use strict';

angular.module('facebookFeed')
  .controller('MainCtrl', function($scope, $http, $timeout) {
    $scope.getGraph = getGraph;
    $scope.facebookURLChanged = facebookURLChanged;


    function facebookURLChanged(facebook_url) {
      $timeout.cancel($scope.timer);
      $scope.timer = $timeout(function() {
        getGraph(facebook_url);
      }, 300);
    }

    function getGraph(facebook_url) {
      $http.get(encodeURI('https://graph.facebook.com/' + facebook_url))
        .success(successCallback)
        .error(errorCallback);
    }

    function successCallback(data, status) {
      $scope.rep = data;
      facebookId(data['id']);
      feedLink();
      // $scope.error = data['error'];
    }

    function praseRes(res) {

    }

    function facebookId(id) {
      if (typeof id == 'string' || typeof id == 'number') {
        $scope.facebook_id = id;
        return $scope.facebook_id;
      } else if (typeof $scope.facebook_id == 'string' || typeof $scope.facebook_id ==
        'number') {
        return $scope.feed_link;
      }
    }

    function feedLink() {
      var baseUrl =
        'https://www.facebook.com/feeds/page.php?format=rss20&id=';
      if (typeof $scope.facebook_id == 'string' || typeof $scope.facebook_id ==
        'number') {
        $scope.feed_url = baseUrl + $scope.facebook_id;
      }
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
