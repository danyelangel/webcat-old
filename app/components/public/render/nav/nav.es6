(function () {
  'use strict';
  class Controller {
    constructor() {
    }
  }
  angular
    .module('webcatRender')
    .component('wcRenderNav', {
      templateUrl: 'components/public/render/nav/nav.html',
      controller: Controller,
      bindings: {
        tao: '<',
        doc: '<'
      }
    });
}());
