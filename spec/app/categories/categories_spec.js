var $state, $location, $rootScope, $templateCache;

describe('app.categories', function() {
  var $controller, $scope, $httpBackend, categoriesListCtrl, CategorySrvc;

  beforeEach(function() {
    module('app.routing');
    module('app.categories');

    inject(
      function(
        _$state_, _$rootScope_, _$controller_, _$location_, _$templateCache_,
        _$httpBackend_, _CategorySrvc_
      ) {
        $state          = _$state_;
        $location       = _$location_;
        $rootScope      = _$rootScope_;
        $controller     = _$controller_;
        $templateCache  = _$templateCache_;
        $httpBackend    = _$httpBackend_;

        CategorySrvc    = _CategorySrvc_;

        $scope = $rootScope.$new();
      }
    );

    mockTemplate('app/categories/categories.tmpl.html', '');
    mockTemplate('app/categories/bookmarks/bookmarks.tmpl.html', '');

    $httpBackend.when('GET', '/data/categories.json').respond(categoriesData);

    goTo('/');

    categoriesListCtrl = $controller('CategoriesListCtrl', { '$scope': $scope });

    $httpBackend.flush();
  });

  describe('CategoriesListCtrl controller', function() {
    it('sets categories', function() {
      expect(categoriesListCtrl.categories).toEqual(categoriesData);
    });

    describe('#isCurrentCategory', function() {
      it('calls Categories.isCurrentCategory', function() {
        expect(
          categoriesListCtrl.isCurrentCategory
        ).toEqual(CategorySrvc.isCurrentCategory);
      });
    });
  });
});
