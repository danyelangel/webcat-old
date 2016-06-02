(function () {
  'use strict';
  angular
    .module('webcatRender')
    .component('wcRenderSections', {
      templateUrl: 'components/public/render/sections/sections.html',
      bindings: {
        doc: '<'
      }
    });
}());
