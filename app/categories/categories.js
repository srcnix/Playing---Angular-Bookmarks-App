angular.module('app.categories', [
  'app.services.category'
]).controller(
  'CategoriesListCtrl',
  [
    '$scope', 'CategorySrvc', function($scope, CategorySrvc) {
      var categoriesListCtrl = this;

      CategorySrvc.getAll().then(function(categories) {
        categoriesListCtrl.categories = categories;
      });

      categoriesListCtrl.isCurrentCategory = CategorySrvc.isCurrentCategory;
    }
  ]
);
