(function () {
  'use strict';
  class Controller {
    constructor(DashboardDocumentLbl, Label, DocumentState, Sanitize) {
      this.$l = Label.$l(DashboardDocumentLbl);
      this.$html = Sanitize.$html();
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
        taoId: '<',
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
