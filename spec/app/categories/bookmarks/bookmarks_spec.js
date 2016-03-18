var $state, $location, $rootScope, $templateCache;

describe('app.categories.bookmarks', function() {
  var $controller, $scope, $httpBackend, CategorySrvc, BookmarkSrvc, bookmarksListCtrl;

  beforeEach(function() {
    module('app.routing');
    module('app.categories.bookmarks');

    inject(
      function(
        _$state_, _$rootScope_, _$controller_, _$location_, _$templateCache_,
        _$httpBackend_, _CategorySrvc_, _BookmarkSrvc_
      ) {
        $state          = _$state_;
        $location       = _$location_;
        $rootScope      = _$rootScope_;
        $controller     = _$controller_;
        $templateCache  = _$templateCache_;
        $httpBackend    = _$httpBackend_;

        CategorySrvc    = _CategorySrvc_;
        BookmarkSrvc    = _BookmarkSrvc_;

        $scope = $rootScope.$new();
      }
    );

    mockTemplate('app/categories/categories.tmpl.html', '');
    mockTemplate('app/categories/bookmarks/bookmarks.tmpl.html', '');

    $httpBackend.when('GET', '/data/categories.json').respond(categoriesData);
    $httpBackend.when('GET', '/data/bookmarks.json').respond(bookmarksData);

    goTo('/categories/Design');

    bookmarksListCtrl = $controller('BookmarksListCtrl', { '$scope': $scope });

    $httpBackend.flush();
  });

  describe('BookmarksListCtrl controller', function() {
    it('sets current category', function() {
      expect(CategorySrvc.currentCategory).toEqual(categoriesData[1]);
    });

    it('sets bookmarks', function() {
      expect(bookmarksListCtrl.bookmarks).toEqual(bookmarksData);
    });

    describe('#getCurrentCategory', function() {
      it('calls Bookmarks.getCurrentCategory', function() {
        expect(
          bookmarksListCtrl.getCurrentCategory
        ).toEqual(CategorySrvc.getCurrentCategory)
      });
    });

    describe('#getCurrentCategoryName', function() {
      it('calls Bookmarks.getCurrentCategoryName', function() {
        expect(
          bookmarksListCtrl.getCurrentCategoryName
        ).toEqual(CategorySrvc.getCurrentCategoryName)
      });
    });

    describe('#deleteBookmark', function() {
      it('calls Bookmarks.delete', function() {
        expect(
          bookmarksListCtrl.deleteBookmark
        ).toEqual(BookmarkSrvc.delete)
      });
    });
  });
});
