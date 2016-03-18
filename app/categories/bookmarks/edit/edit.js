angular.module('app.categories.bookmarks.edit', [
  'app.services.bookmark'
]).controller(
  'EditBookmarkCtrl',
  [
    '$state', '$stateParams', 'BookmarkSrvc',
    function($state, $stateParams, BookmarkSrvc) {
      var editBookmarkCtrl = this;

      function returnToBookmarks() {
        $state.go('app.categories.bookmarks', { category: $stateParams.category })
      }

      editBookmarkCtrl.cancelEditing = function() {
        returnToBookmarks();
      }

      editBookmarkCtrl.updateBookmark = function() {
        BookmarkSrvc.update(editBookmarkCtrl.editedBookmark);

        returnToBookmarks();
      }

      BookmarkSrvc.findById($stateParams.bookmarkId).then(function(bookmark) {
        if(bookmark) {
          editBookmarkCtrl.bookmark       = bookmark;
          editBookmarkCtrl.editedBookmark = angular.copy(bookmark);
        } else {
          returnToBookmarks();
        }
      });
    }
  ]
);
