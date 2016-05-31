(function () {
  'use strict';
  class Controller {
    constructor() {
    }
    remove() {
      this.onSectionRemove()();
    }
    update() {
      this.onSectionUpdate()(this.section);
    }
    uploadImage(file) {
      this.onSectionImageUpload()(file);
    }
    removeImage() {
      this.onSectionImageRemove()();
    }
  }
  angular
    .module('webcatEditor')
    .component('wcEditorSection', {
      templateUrl: 'components/private/editor/sections/section/section.html',
      controller: Controller,
      bindings: {
        section: '<',
        isPreview: '<',
        onSectionUpdate: '&',
        onSectionRemove: '&',
        onSectionImageUpload: '&',
        onSectionImageRemove: '&'
      }
    });
}());
