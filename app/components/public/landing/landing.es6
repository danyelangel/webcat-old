(function () {
  'use strict';
  class Controller {
    constructor(UserActions, TaoState, DocumentState, $scope, $anchorScroll) {
      this.UserActions = UserActions;
      this.$scope = $scope;
      this.TaoState = TaoState;
      this.DocumentState = DocumentState;
      this.getDoc();
      this.$anchorScroll = $anchorScroll;
      this.UserActions.onAuth(() => {
        this.$router.navigate(['Dashboard']);
      });
    }
    $routerOnActivate() {
      let taoId = 'landingPage';
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
    .module('landing', [])
    .component('landingEl', {
      templateUrl: 'components/public/landing/landing.html',
      controller: Controller,
      bindings: {
        $router: '<'
      }
    });
}());
