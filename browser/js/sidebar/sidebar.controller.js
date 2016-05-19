juke.controller('SidebarCtrl', function($scope, $rootScope) {
	$scope.viewAlbums = function() {
		console.log('albums clicked')
		$rootScope.$broadcast('albumShow')
	}
});