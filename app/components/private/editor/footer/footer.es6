(function () {
  'use strict';
  class Controller {
    constructor() {
    }
    update() {
      this.onUpdate()(this.metadata);
    }
  }
  angular
    .module('webcatEditor')
    .component('wcEditorFooter', {
      templateUrl: 'components/private/editor/footer/footer.html',
      controller: Controller,
      bindings: {
        metadata: '<',
        onUpdate: '&'
      }
    });
}());
