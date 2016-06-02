(function () {
  'use strict';
  angular
    .module('webcatRender')
    .component('wcRenderFooter', {
      templateUrl: 'components/public/render/footer/footer.html',
      bindings: {
        metadata: '<'
      }
    });
}());
