(function () {
  'use strict';
  class Controller {
    constructor(UserActions, TaoState, DocumentState, $scope, DocumentActions, $anchorScroll) {
      this.UserActions = UserActions;
      this.UserActions.onUnauth(() => {
        this.$router.navigate(['Landing']);
      });
      this.$scope = $scope;
      this.TaoState = TaoState;
      this.DocumentState = DocumentState;
      this.DocumentActions = DocumentActions;
      this.$anchorScroll = $anchorScroll;
      this.getDoc();
    }
    $routerOnActivate(next) {
      let taoId = next.params.taoId;
      this.tao = this.TaoState.getTao(taoId);
      this.$anchorScroll('scrollTop');
    }
    $routerOnDeactivate() {
      this.DocumentState.cleanUp();
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
    updateMetadata() {
      return (data) => {
        this.DocumentActions.updateMetadata(data, this.docId);
      };
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
    uploadThumbnailImage() {
      return (file) => {
        let docId = this.docId;
        this.DocumentActions.uploadThumbnailImage(file, docId);
      };
    }
    removeThumbnailImage() {
      return () => {
        let docId = this.docId;
        this.DocumentActions.removeThumbnailImage(docId);
      };
    }
    addSectionYoutube() {
      return (sectionId) => {
        console.log('plop');
        let docId = this.docId;
        this.DocumentActions.addSectionYoutube(sectionId, docId);
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
