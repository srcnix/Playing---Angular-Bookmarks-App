var $state, $location, $rootScope, $templateCache;

describe('app.routing', function() {
  beforeEach(function() {
    module('app.routing');

    inject(function(_$state_, _$rootScope_, _$location_, _$templateCache_) {
      $state          = _$state_;
      $location       = _$location_;
      $rootScope      = _$rootScope_;
      $templateCache  = _$templateCache_;
    });

    mockTemplate('app/categories/categories.tmpl.html', '');
    mockTemplate('app/categories/bookmarks/bookmarks.tmpl.html', '');
  });

  it('redirects to / on non-matching routes', function() {
    goTo('/a-random-route');

    expect($state.current.url).toEqual('/');
  });

  it('matches app.categories state', function() {
    goTo('/');

    expect($state.current.name).toEqual('app.categories');
  });

  it('matches app.categories.bookmarks state', function() {
    goTo('/categories/Design');

    expect($state.current.name).toEqual('app.categories.bookmarks');
  });

  it('matches app.categories.bookmarks.create state', function() {
    mockTemplate('app/categories/bookmarks/create/create.tmpl.html', '');
    goTo('/categories/Design/bookmarks/create');

    expect($state.current.name).toEqual('app.categories.bookmarks.create');
  });

  it('matches app.categories.bookmarks.edit state', function() {
    mockTemplate('app/categories/bookmarks/edit/edit.tmpl.html', '');
    goTo('/categories/Development/bookmarks/0/edit');

    expect($state.current.name).toEqual('app.categories.bookmarks.edit');
  });
});
