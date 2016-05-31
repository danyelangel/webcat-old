(function () {
  'use strict';
  class Controller {
    constructor(UserActions, TaoState, DocumentState, $scope, DocumentActions) {
      this.UserActions = UserActions;
      this.UserActions.onUnauth(() => {
        this.$router.navigate(['Landing']);
      });
      this.$scope = $scope;
      this.TaoState = TaoState;
      this.DocumentState = DocumentState;
      this.DocumentActions = DocumentActions;
      this.getDoc();
    }
    $routerOnActivate(next) {
      let taoId = next.params.taoId;
      this.tao = this.TaoState.getTao(taoId);
    }
    getDoc() {
      this.$scope.$watch('$ctrl.tao.languages', () => {
        let docId = this.tao.languages.es;
        if (docId) {
          this.docId = docId;
          this.doc = this.DocumentState.getDoc(docId);
        }
      });
    }
    addSection() {
      return (priority) => {
        this.isDisabled = true;
        this.DocumentActions
          .addSection(this.docId, priority)
          .then(() => {
            this.isDisabled = null;
            this.$scope.$apply();
          });
      };
    }
    removeSection() {
      return (sectionId) => {
        let docId = this.docId;
        this.DocumentActions.removeSection(sectionId, docId);
      };
    }
    updateSection() {
      return (data, sectionId) => {
        let docId = this.docId;
        this.DocumentActions.updateSection(data, sectionId, docId);
      };
    }
    uploadSectionImage() {
      return (file, sectionId) => {
        let docId = this.docId;
        this.DocumentActions.uploadSectionImage(file, sectionId, docId);
      };
    }
    removeSectionImage() {
      return (sectionId) => {
        let docId = this.docId;
        this.DocumentActions.removeSectionImage(sectionId, docId);
      };
    }
  }
  angular
    .module('webcatEditor', ['ngFileUpload', 'angular-medium-editor'])
    .component('wcEditor', {
      templateUrl: 'components/private/editor/editor.html',
      controller: Controller,
      bindings: {
        $router: '<'
      }
    });
}());
