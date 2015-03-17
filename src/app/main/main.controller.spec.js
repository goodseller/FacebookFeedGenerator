'use strict';

describe('controllers', function() {
	var scope;

	beforeEach(module('facebookFeed'));

	beforeEach(inject(function($rootScope) {
		scope = $rootScope.$new();
	}));

	it('should define more than 5 awesome things', inject(function($controller) {

		$controller('MainCtrl', {
			$scope: scope
		});

	}));
});
