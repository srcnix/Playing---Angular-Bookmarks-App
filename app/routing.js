angular.module('app.routing', [
  'ui.router'
]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    abstract: true
  });

  $stateProvider.state('app.categories', {
    url: '/',
    views: {
      'categories@': {
        controller:   'CategoriesListCtrl as categoriesListCtrl',
        templateUrl:  'app/categories/categories.tmpl.html'
      },
      'bookmarks@': {
        controller:   'BookmarksListCtrl as bookmarksListCtrl',
        templateUrl:  'app/categories/bookmarks/bookmarks.tmpl.html'
      }
    }
  });

  $stateProvider.state('app.categories.bookmarks', {
    url: 'categories/:category',
    views: {
      'bookmarks@': {
        controller:   'BookmarksListCtrl as bookmarksListCtrl',
        templateUrl:  'app/categories/bookmarks/bookmarks.tmpl.html'
      }
    }
  });

  $stateProvider.state('app.categories.bookmarks.create', {
    url:          '/bookmarks/create',
    controller:   'CreateBookmarkCtrl as createBookmarkCtrl',
    templateUrl:  'app/categories/bookmarks/create/create.tmpl.html'
  });

  $stateProvider.state('app.categories.bookmarks.edit', {
    url:          '/bookmarks/:bookmarkId/edit',
    controller:   'EditBookmarkCtrl as editBookmarkCtrl',
    templateUrl:  'app/categories/bookmarks/edit/edit.tmpl.html'
  });

  $urlRouterProvider.otherwise('/')
}]);
