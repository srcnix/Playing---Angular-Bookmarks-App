var $state, $location, $rootScope, $templateCache;

describe('app.categories.bookmarks.edit', function() {
  var $controller, $scope, $httpBackend, BookmarkSrvc, editBookmarkCtrl;

  beforeEach(function() {
    module('app.routing');
    module('app.categories.bookmarks.edit');

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

        BookmarkSrvc       = _BookmarkSrvc_;

        $scope = $rootScope.$new();
      }
    );

    mockTemplate('app/categories/categories.tmpl.html', '');
    mockTemplate('app/categories/bookmarks/bookmarks.tmpl.html', '');
    mockTemplate('app/categories/bookmarks/edit/edit.tmpl.html', '');

    $httpBackend.when('GET', '/data/bookmarks.json').respond(bookmarksData);

    // Set $stateParams
    goTo('/categories/Development/bookmarks/0/edit');

    // Load the controller
    editBookmarkCtrl = $controller('EditBookmarkCtrl', { '$scope': $scope });

    // Flush promises ($scope.$digest();)
    $httpBackend.flush();
  });

  describe('EditBookmarkCtrl controller', function() {
    describe('#cancelEditing', function() {
      it('changes state to bookmarks', function() {
        editBookmarkCtrl.cancelEditing();
        $scope.$apply();

        expect($state.current.url).toEqual('categories/:category');
      });
    });

    describe('#updateBookmark', function() {
      beforeEach(function() {
        spyOn($state, 'go').and.callThrough();

        editBookmarkCtrl.editedBookmark       = angular.copy(bookmarksData[1]);
        editBookmarkCtrl.editedBookmark.title = 'Updated title';

        editBookmarkCtrl.updateBookmark();
        $scope.$apply();
      });

      it('updates bookmark', function() {
        expect(
          BookmarkSrvc.bookmarks[1]
        ).toEqual(editBookmarkCtrl.editedBookmark);
      });

      it('changes state to app.categories.bookmarks', function() {
        expect($state.go).toHaveBeenCalledWith(
          'app.categories.bookmarks', { category: 'Development' }
        );
      });
    });

    describe('when the bookmark exists', function() {
      it('sets the bookmark', function() {
        expect(editBookmarkCtrl.bookmark).toEqual(bookmarksData[0]);
      });

      it('sets the editing bookmark', function() {
        expect(editBookmarkCtrl.editedBookmark).toEqual(bookmarksData[0]);
      })
    });

    describe('when the bookmark does not exist', function() {
      it('changes state to bookmarks', function() {
        spyOn($state, 'go').and.callThrough();

        goTo('/categories/Design/bookmarks/9999/edit');

        editBookmarkCtrl = $controller('EditBookmarkCtrl', { '$scope': $scope });

        $scope.$digest();

        expect($state.go).toHaveBeenCalledWith(
          'app.categories.bookmarks', { category: 'Design' }
        );
      });
    });
  });
});
