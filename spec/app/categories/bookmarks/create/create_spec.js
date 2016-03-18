var $state, $location, $rootScope, $templateCache;

describe('app.categories.bookmarks.create', function() {
  var $controller, $scope, $httpBackend, BookmarkSrvc, createBookmarkCtrl;

  beforeEach(function() {
    module('app.routing');
    module('app.categories.bookmarks.create');

    inject(
      function(
        _$state_, _$rootScope_, _$controller_, _$location_, _$templateCache_,
        _$httpBackend_, _BookmarkSrvc_, _$stateParams_
      ) {
        $state          = _$state_;
        $location       = _$location_;
        $rootScope      = _$rootScope_;
        $controller     = _$controller_;
        $templateCache  = _$templateCache_;
        $httpBackend    = _$httpBackend_;
        $stateParams    = _$stateParams_;

        BookmarkSrvc    = _BookmarkSrvc_;

        $scope = $rootScope.$new();
      }
    );

    mockTemplate('app/categories/categories.tmpl.html', '');
    mockTemplate('app/categories/bookmarks/bookmarks.tmpl.html', '');
    mockTemplate('app/categories/bookmarks/create/create.tmpl.html', '');

    goTo('/categories/Design/bookmarks/create');

    createBookmarkCtrl = $controller('CreateBookmarkCtrl', { '$scope': $scope });
  });

  describe('CreateBookmarkCtrl controller', function() {
    it('setups new bookmark object', function() {
      var expectedObject = {
        category: $stateParams.category,
        title:    '',
        url:      ''
      };

      expect(createBookmarkCtrl.newBookmark).toEqual(expectedObject);
    });

    describe('#cancelCreating', function() {
      it('changes state to bookmarks', function() {
        createBookmarkCtrl.cancelCreating();
        $scope.$apply();

        expect($state.current.url).toEqual('categories/:category');
      });
    });

    describe('#createBookmark', function() {
      var bookmark;

      beforeEach(function() {
        spyOn($state, 'go').and.callThrough();

        bookmark        = angular.copy(createBookmarkCtrl.newBookmark);
        bookmark.title  = 'Example';
        bookmark.url    = 'http://www.google.com';

        createBookmarkCtrl.createBookmark(bookmark);
        $scope.$apply();
      })

      it('adds bookmark', function() {
        expect(BookmarkSrvc.bookmarks[0]).toEqual(bookmark);
      });

      it('changes state to app.categories.bookmarks', function() {
        expect($state.go).toHaveBeenCalledWith(
          'app.categories.bookmarks', { category: 'Design' }
        )
      });
    });
  });
});
