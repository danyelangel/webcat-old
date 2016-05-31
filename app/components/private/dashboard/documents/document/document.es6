(function () {
  'use strict';
  class Controller {
    constructor(DashboardDocumentLbl, Label, DocumentState) {
      this.$l = Label.$l(DashboardDocumentLbl);
      this.DocumentState = DocumentState;
    }
    getDocMetadata(docId) {
      if (angular.isString(docId)) {
        return this.DocumentState.getDocumentMetadata(docId).metadata;
      }
    }
    archive() {
      this.onArchive()();
    }
    unarchive() {
      this.onUnarchive()();
    }
    edit() {
      this.onEdit()();
    }
    remove() {
      this.onRemove()();
    }
  }
  angular
    .module('dashboard')
    .component('dashboardDocument', {
      templateUrl: 'components/private/dashboard/documents/document/document.html',
      controller: Controller,
      bindings: {
        metadata: '<',
        isDisabled: '<',
        onRemove: '&',
        onEdit: '&',
        onArchive: '&',
        onUnarchive: '&'
      }
    })
    .constant('DashboardDocumentLbl', {
      es: {
        REMOVE: 'Delete',
        EDIT: 'Editar',
        ARCHIVE: 'Archivar'
      }
    });
}());