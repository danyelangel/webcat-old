(function () {
  'use strict';
  class Controller {
    constructor() {
    }
    openMenu($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    }
    uploadImage(file) {
      this.onImageUpload()(file);
    }
    removeImage() {
      this.onImageRemove()();
    }
    update() {
      this.onUpdate()(this.metadata);
    }
  }
  angular
    .module('webcatEditor')
    .component('wcEditorSplash', {
      templateUrl: 'components/private/editor/splash/splash.html',
      controller: Controller,
      bindings: {
        metadata: '<',
        isPreview: '<',
        onUpdate: '&',
        onImageUpload: '&',
        onImageRemove: '&'
      }
    });
}());
