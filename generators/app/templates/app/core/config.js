(function () {
	'use strict';

	angular
		.module('bb.core')
		.config(configuration)

		function configuration ($routeProvider, $locationProvider) {
			$routeProvider
				.when('/view1', {
					templateUrl: 'partials/partial1.html', 
					controller: 'MyCtrl1'
				})
				.when('/view2', {
					templateUrl: 'partials/partial2.html', 
					controller: 'MyCtrl2'
				})
				.otherwise({
					redirectTo: '/view1'
				});
	
			// use the HTML5 History API to improve SEO 
			// https://docs.angularjs.org/api/ng/provider/$locationProvider
			
			$locationProvider.html5Mode(true); 
			
		}
})();
