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
      if (file) {
        this.onSectionImageUpload()(file);
      }
    }
    addYoutube() {
      this.section.display.hasBackgroundImage = false;
      this.section.display.hasBackgroundBlur = true;
      this.update();
      this.onSectionYoutubeAdd()();
    }
    removeImage() {
      this.section.display.hasBackgroundImage = false;
      this.section.display.hasBackgroundBlur = true;
      this.update();
      this.onSectionImageRemove()();
    }
    openMenu($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    }
    toggleBackgroundImage() {
      this.section.display.hasBackgroundImage = !this.section.display.hasBackgroundImage;
      if (!this.section.display.hasBackgroundImage) {
        this.section.display.hasBackgroundBlur = true;
      }
      this.update();
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
        onSectionImageRemove: '&',
        onSectionYoutubeAdd: '&'
      }
    });
}());
