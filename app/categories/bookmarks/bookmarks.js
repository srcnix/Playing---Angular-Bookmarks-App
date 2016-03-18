angular.module('app.categories.bookmarks', [
  'app.services.category',
  'app.services.bookmark',
  'app.categories.bookmarks.create',
  'app.categories.bookmarks.edit'
]).controller(
  'BookmarksListCtrl',
  [
    '$stateParams', 'CategorySrvc', 'BookmarkSrvc',
    function($stateParams, CategorySrvc, BookmarkSrvc) {
      var bookmarksListCtrl = this;

      CategorySrvc.setCurrentCategory($stateParams.category)

      BookmarkSrvc.getAll().then(function(bookmarks) {
        bookmarksListCtrl.bookmarks = bookmarks;
      });

      bookmarksListCtrl.getCurrentCategory     = CategorySrvc.getCurrentCategory;
      bookmarksListCtrl.getCurrentCategoryName = CategorySrvc.getCurrentCategoryName;
      bookmarksListCtrl.deleteBookmark         = BookmarkSrvc.delete;
    }
  ]
);
