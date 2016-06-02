(function () {
  'use strict';
  class Controller {
    constructor(Sanitize) {
      this.$s = Sanitize.$html();
    }
  }
  angular
    .module('webcatRender')
    .component('wcRenderSection', {
      templateUrl: 'components/public/render/sections/section/section.html',
      controller: Controller,
      bindings: {
        section: '<'
      }
    });
}());
