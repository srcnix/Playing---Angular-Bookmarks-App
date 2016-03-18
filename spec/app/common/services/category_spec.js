describe('CategorySrvc', function() {
  var CategorySrvc, $httpBackend, $rootScope, promiseResult;

  beforeEach(function() {
    module('app.services.category');
  });

  beforeEach(inject(function(_CategorySrvc_, _$httpBackend_, _$rootScope_) {
    CategorySrvc  = _CategorySrvc_;
    $httpBackend  = _$httpBackend_;
    $rootScope    = _$rootScope_;
  }));

  function mockCategoriesCache() {
    CategorySrvc.categories = angular.copy(categoriesData);
  }

  describe('categories', function() {
    it('should be an array', function() {
      expect(CategorySrvc.categories).toBeArray();
    });
  });

  describe('#getAll', function() {
    beforeEach(function() {
      $httpBackend.when('GET', '/data/categories.json').respond(categoriesData);

      CategorySrvc.getAll().then(function(result) {
        promiseResult = result;
      });

      $httpBackend.flush();
    });

    it('returns a promise', function() {
      expect(typeof(CategorySrvc.getAll().then)).toBe('function')
    });

    it('caches the categories', function() {
      CategorySrvc.getAll();

      expect($httpBackend.flush).toThrow();
    });

    describe('promise resolved', function() {
      it('returns an array', function() {
        expect(promiseResult).toBeArrayOfObjects();
      });

      it('returns an array of categories', function() {
        expect(promiseResult).toEqual(categoriesData);
      });
    });
  });

  describe('#getByName', function() {
    it('returns a promise', function() {
      expect(typeof(CategorySrvc.getByName().then)).toBe('function');
    });

    describe('promise resolved', function() {
      beforeEach(function() {
        mockCategoriesCache();

        CategorySrvc.getByName('Exercise').then(function(result) {
          promiseResult = result;
        });

        $rootScope.$apply();
      });

      it('returns an object', function() {
        expect(promiseResult).toBeObject();
      });

      it('returns the correct category object', function() {
        expect(promiseResult).toEqual(categoriesData[2]);
      });
    });
  });

  describe('#getCurrentCategory', function() {
    it('returns current category object', function() {
      CategorySrvc.currentCategory = categoriesData[1];

      expect(CategorySrvc.getCurrentCategory()).toEqual(categoriesData[1]);
    });
  });

  describe('#setCurrentCategory', function() {
    it('sets current category', function() {
      mockCategoriesCache();

      CategorySrvc.setCurrentCategory('Development');
      $rootScope.$apply();

      expect(CategorySrvc.currentCategory).toEqual(categoriesData[0]);
    });
  });

  describe('#getCurrentCategoryName', function() {
    describe('when no current category', function() {
      it('returns an empty string', function() {
        expect(CategorySrvc.getCurrentCategoryName()).toEqual('');
      });
    });

    describe('when current category', function() {
      it('returns category name', function() {
        CategorySrvc.currentCategory = categoriesData[3];

        expect(CategorySrvc.getCurrentCategoryName()).toEqual(categoriesData[3]['name']);
      });
    });
  });

  describe('#isCurrentCategory', function() {
    it('returns true if category is current category', function() {
      CategorySrvc.currentCategory = categoriesData[0];

      expect(CategorySrvc.isCurrentCategory(categoriesData[0])).toBeTruthy();
    });

    it('returns true if category is not current category', function() {
      CategorySrvc.currentCategory = categoriesData[0];

      expect(CategorySrvc.isCurrentCategory(categoriesData[1])).toBeFalsy();
    });
  });
});
