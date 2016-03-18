angular.module('app.categories.bookmarks.create', [
  'app.services.bookmark'
]).controller(
  'CreateBookmarkCtrl',
  [
    '$state', '$stateParams', 'BookmarkSrvc',
    function($state, $stateParams, BookmarkSrvc) {
      var createBookmarkCtrl = this;

      createBookmarkCtrl.newBookmark = {
        category: $stateParams.category,
        title:    '',
        url:      ''
      }

      function returnToBookmarks() {
        $state.go('app.categories.bookmarks', { category: $stateParams.category });
      }

      createBookmarkCtrl.cancelCreating = function() {
        returnToBookmarks();
      }

      createBookmarkCtrl.createBookmark = function(bookmark) {
        BookmarkSrvc.create(bookmark);
        returnToBookmarks();
      }
    }
  ]
);
