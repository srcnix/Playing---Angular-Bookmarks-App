function goTo(url) {
  $location.url(url);
  $rootScope.$digest();
}

function mockTemplate(file, content) {
  $templateCache.put(file, content || file);
}
