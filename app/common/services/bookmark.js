angular.module('app.services.bookmark', [

]).service('BookmarkSrvc', function($http, $q) {
  var service   = this,
      URLS      = {
        FETCH: '/data/bookmarks.json'
      };

  service.bookmarks = [];

  function cacheBookmarks(result) {
    return service.bookmarks = result.data;
  }

  function findById(bookmarkId) {
    return _.find(service.bookmarks, function(bookmark) {
      return bookmark.id == parseInt(bookmarkId, 10);
    });
  }

  service.getAll = function() {
    return (service.bookmarks.length) ? $q.when(service.bookmarks) : $http.get(URLS.FETCH).then(cacheBookmarks)
  };

  service.findById = function(bookmarkId) {
    var deferred = $q.defer();

    service.getAll().then(function() {
      deferred.resolve(findById(bookmarkId));
    });

    return deferred.promise
  };

  service.create = function(bookmark) {
    bookmark.id = service.bookmarks.length;
    service.bookmarks.push(bookmark);
  };

  service.update = function(bookmark) {
    var index = _.findIndex(service.bookmarks, function(b) {
      return b.id == bookmark.id
    });

    service.bookmarks[index] = bookmark;
  };

  service.delete = function(bookmark) {
    _.remove(service.bookmarks, function(b) {
      return b.id == bookmark.id
    })
  };
});
