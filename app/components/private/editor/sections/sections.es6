(function () {
  'use strict';
  class Controller {
    constructor() {
    }
    addSection(prev, next) {
      let priority;
      if (!next) {
        next = prev + 2;
      }
      if (!prev) {
        prev = 0;
      }
      priority = (prev + next) / 2;
      this.onSectionAdd()(priority);
    }
    removeSection(sectionId) {
      return () => {
        this.onSectionRemove()(sectionId);
      };
    }
    updateSection(sectionId) {
      return (data) => {
        this.onSectionUpdate()(data, sectionId);
      };
    }
    uploadSectionImage(sectionId) {
      return (file) => {
        this.onSectionImageUpload()(file, sectionId);
      };
    }
    removeSectionImage(sectionId) {
      return () => {
        this.onSectionImageRemove()(sectionId);
      };
    }
  }
  angular
    .module('webcatEditor')
    .component('wcEditorSections', {
      templateUrl: 'components/private/editor/sections/sections.html',
      controller: Controller,
      bindings: {
        doc: '<',
        isPreview: '<',
        onSectionAdd: '&',
        onSectionRemove: '&',
        onSectionUpdate: '&',
        onSectionImageUpload: '&',
        onSectionImageRemove: '&'
      }
    });
}());
