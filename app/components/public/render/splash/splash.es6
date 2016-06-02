(function () {
  'use strict';
  class Controller {
    constructor(Sanitize) {
      this.$s = Sanitize.$html();
    }
  }
  angular
    .module('webcatRender')
    .component('wcRenderSplash', {
      templateUrl: 'components/public/render/splash/splash.html',
      controller: Controller,
      bindings: {
        metadata: '<'
      }
    });
}());
