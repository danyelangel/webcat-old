(function () {
  'use strict';
  class Controller {
    constructor(TaoState, DocumentState, $scope, $anchorScroll) {
      this.$scope = $scope;
      this.TaoState = TaoState;
      this.DocumentState = DocumentState;
      this.getDoc();
      this.$anchorScroll = $anchorScroll;
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
  }
  angular
    .module('webcatRender', [])
    .component('wcRender', {
      templateUrl: 'components/public/render/render.html',
      controller: Controller,
      bindings: {
        $router: '<'
      }
    });
}());
