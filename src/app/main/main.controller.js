'use strict';

angular.module('facebookFeed')
  .controller('MainCtrl', function($scope, $http, $timeout) {
    $scope.getGraph = getGraph;
    $scope.facebookURLChanged = facebookURLChanged;

    function clearAlerts() {
      $scope.err = undefined;
      $scope.suc = undefined;
      $scope.info = undefined;
    }

    function facebookURLChanged(facebook_url) {
      // clear all last values
      clearAlerts();
      $scope.feed_url = undefined;
      $scope.facebook_id = undefined;

      $timeout.cancel($scope.timer);
      $scope.timer = $timeout(function() {
        if (facebook_url) {
          getGraph(facebook_url);
        }
      }, 300);
    }

    function getGraph(facebook_url) {
      if (!/^https?:\/\//.test(facebook_url)) {
        //pending http for no prepending url string
        facebook_url = 'http://' + facebook_url;
      }

      $http.get(encodeURI('https://graph.facebook.com/' + facebook_url))
        .success(successCallback)
        .error(errorCallback);
    }

    function successCallback(data, status) {
      $scope.rep = data;
      facebookIdRsp(data['id']);
      feedLink();
    }

    function errorCallback(data, status) {
      $scope.err =
        'Unable to get data from Facebook. Please check your connection or input.';
    }

    function facebookIdRsp(id) {
      id = String(id);

      if (/^\d+$/.test(id)) {
        $scope.facebook_id = id;

        clearAlerts();
        $scope.suc =
          'Facebook Feed Link generated successfully! Please click the buttons on Step 2.';
        return $scope.facebook_id;
      } else {
        clearAlerts();
        $scope.err = 'Invalid value! Please check the URL input.';
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

    var client = new ZeroClipboard(document.getElementById("copy-button"));

    client.on("ready", function(readyEvent) {
      client.on("aftercopy", function(event) {});
    });

  });
