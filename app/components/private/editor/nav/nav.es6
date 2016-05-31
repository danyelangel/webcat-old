(function () {
  'use strict';
  class Controller {
    constructor($rootRouter) {
      this.$rootRouter = $rootRouter;
    }
    goBack() {
      this.$rootRouter.navigate(['Dashboard']);
    }
  }
  angular
    .module('webcatEditor')
    .component('wcEditorNav', {
      templateUrl: 'components/private/editor/nav/nav.html',
      controller: Controller,
      bindings: {
        tao: '<',
        doc: '<',
        isPreview: '='
      }
    });
}());
