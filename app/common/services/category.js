angular.module('app.services.category', [

]).service('CategorySrvc', function($http, $q) {
  var model           = this,
      URLS            = {
        FETCH: '/data/categories.json'
      };

  model.categories       = [];
  model.currentCategory  = null;

  function cacheCategories(result) {
    return model.categories = result.data;
  }

  model.getAll = function() {
    return (model.categories.length) ? $q.when(model.categories) : $http.get(URLS.FETCH).then(cacheCategories);
  };

  model.getByName = function(categoryName) {
    var deferred = $q.defer();

    function findCategory() {
      return _.find(model.categories, function(c) {
        return c.name == categoryName
      });
    }

    model.getAll().then(function() {
      deferred.resolve(findCategory());
    });

    return deferred.promise;
  };

  model.setCurrentCategory = function(categoryName) {
    return model.getByName(categoryName).then(function(category) {
      model.currentCategory = category;
    });
  };

  model.getCurrentCategory = function() {
    return model.currentCategory;
  };

  model.getCurrentCategoryName = function() {
    return model.currentCategory ? model.currentCategory.name : '';
  };

  model.isCurrentCategory = function(category) {
    if(category == undefined)
    {
      if(model.currentCategory == null)
      {
        return true;
      }
      else
      {
        return false;
      }
    }

    return model.currentCategory && model.currentCategory.id == category.id;
  };
});
