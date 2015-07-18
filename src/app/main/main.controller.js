'use strict';

angular.module('facebookFeed')
  .controller('MainCtrl', function($scope, $http, $timeout) {
    var access_token = '1645284389050868|CtGtpZtFYNmLL_VZlthyRnhyQWo';
    // get it from:
    // https://graph.facebook.com/oauth/access_token?client_id=1645284389050868&client_secret={{secret}}&grant_type=client_credentials

    var base_url = 'http://fbfeedapi.herokuapp.com/';
    // v2.4: https://developers.facebook.com/docs/graph-api/reference/v2.4/page/feed
    // this one >>> no longer support since 2015-06-23, FB API v2.3. 'https://www.facebook.com/feeds/page.php?format=rss20&id=';


    $scope.getGraph = getGraph;
    $scope.facebookURLChanged = facebookURLChanged;
    $scope.importantMoreShow = false;

    $scope.lastUpd = (function(moment, lastUpd) {
      return moment().from(lastUpd);
    }(moment, '2015-07-18T13:00:00'));

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
          getGraph(facebook_url.replace(/\/$/, ''));
        }
      }, 300);
    }

    function getGraph(facebook_url) {
      if (!/^https?:\/\//.test(facebook_url)) {
        //pending http for no prepending url string
        facebook_url = 'http://' + facebook_url;
      }


      if (!/^https?:\/\/www.facebook.com\//.test(facebook_url)) {
        clearAlerts();
        $scope.err = 'Invalid URL!';
        return false;
      }

      // replace anything after '?' mark
      facebook_url = facebook_url.replace(/[?][\s\S]*/, '');

      $http.get(encodeURI('https://graph.facebook.com/' + facebook_url +
          '?access_token=' +
          access_token))
        .success(function successCallback(data, status) {
          $scope.rep = data;
          facebookIdRsp(data['id']);
          feedLink(facebook_url);
        })
        .error(
          function errorCallback(data, status) {
            $scope.err =
              'Unable to get data from Facebook. Please check your connection or input.';
          });
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

    function feedLink(facebook_url) {
      if (typeof $scope.facebook_id == 'string' || typeof $scope.facebook_id ==
        'number') {
        $scope.feed_url = base_url + facebook_url
      }
    }

    var client = new ZeroClipboard(document.getElementById("copy-button"));

    client.on("ready", function(readyEvent) {
      client.on("aftercopy", function(event) {});
    });

  });
