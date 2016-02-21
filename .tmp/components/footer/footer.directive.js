'use strict';

angular.module('3601S16Lab5JsonDataProcessingApp').directive('footer', function () {
  return {
    templateUrl: 'components/footer/footer.html',
    restrict: 'E',
    link: function link(scope, element) {
      element.addClass('footer');
    }
  };
});
//# sourceMappingURL=footer.directive.js.map
