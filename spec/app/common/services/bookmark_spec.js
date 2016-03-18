describe('BookmarkSrvc', function() {
  var BookmarkSrvc, $httpBackend, $rootScope;

  beforeEach(function() {
    module('app.services.bookmark');
  });

  beforeEach(inject(function(_BookmarkSrvc_, _$httpBackend_, _$rootScope_) {
    BookmarkSrvc  = _BookmarkSrvc_;
    $httpBackend  = _$httpBackend_;
    $rootScope    = _$rootScope_;
  }));

  function getAllBookmarksAndFlush() {
    $httpBackend.when('GET', '/data/bookmarks.json').respond(bookmarksData);

    BookmarkSrvc.getAll().then(function(result) {
      promiseResult = result;
    });

    $httpBackend.flush();
  }

  function mockBookmarksCache() {
    BookmarkSrvc.bookmarks = angular.copy(bookmarksData);
  };

  describe('bookmarks', function() {
    it('should be an array', function() {
      expect(BookmarkSrvc.bookmarks).toBeArray();
    });
  });

  describe('#getAll', function() {
    beforeEach(function() {
      getAllBookmarksAndFlush();
    });

    it('returns a promise', function() {
      expect(typeof(BookmarkSrvc.getAll().then)).toBe('function')
    });

    it('caches the bookmarks', function() {
      BookmarkSrvc.getAll();

      expect($httpBackend.flush).toThrow();
    });

    describe('promise resolved', function() {
      it('returns an array', function() {
        expect(promiseResult).toBeArrayOfObjects();
      });

      it('returns an array of categories', function() {
        expect(promiseResult).toEqual(bookmarksData);
      });
    });
  });

  describe('#findById', function() {
    it('returns a promise', function() {
      expect(typeof(BookmarkSrvc.findById().then)).toBe('function');
    });

    describe('promise resolved', function() {
      beforeEach(function() {
        mockBookmarksCache();

        BookmarkSrvc.findById(1).then(function(result) {
          promiseResult = result;
        });

        $rootScope.$apply();
      });

      it('returns an object', function() {
        expect(promiseResult).toBeObject();
      });

      it('returns the correct bookmark object', function() {
        expect(promiseResult).toEqual(bookmarksData[1]);
      });
    });
  });

  describe('#create', function() {
    it('adds bookmarks', function() {
      var bookmark = {
        title:    'Example',
        url:      'http://www.google.com',
        category: 'Development'
      }

      mockBookmarksCache();
      BookmarkSrvc.create(bookmark);

      bookmark['id'] = 0;

      expect(BookmarkSrvc.bookmarks[9]).toEqual(bookmark);
    });
  });

  describe('#update', function() {
    it('updates bookmark', function() {
      var bookmark = angular.copy(bookmarksData[0]);

      bookmark['title'] = 'Updated';

      mockBookmarksCache();
      BookmarkSrvc.update(bookmark);

      expect(BookmarkSrvc.bookmarks[0]['title']).toEqual('Updated');
    });
  });

  describe('#delete', function() {
    it('removes bookmark', function() {
      mockBookmarksCache();

      BookmarkSrvc.delete(bookmarksData[2]);

      expect(BookmarkSrvc.bookmarks.length).toEqual(8);
    });
  });
});
