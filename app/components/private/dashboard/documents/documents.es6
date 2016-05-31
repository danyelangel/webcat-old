(function () {
  'use strict';
  class Controller {
    constructor(TaoActions, DashboardDocumentsLbl, $scope, Label, TaoState, UserState, $rootRouter) {
      this.$l = Label.$l(DashboardDocumentsLbl);
      this.Actions = TaoActions;
      this.$scope = $scope;
      this.UserState = UserState;
      this.TaoState = TaoState;
      this.$rootRouter = $rootRouter;
    }
    getTao(taoId) {
      return this.TaoState.getTao(taoId);
    }
    addTao() {
      this.isDisabled = true;
      this.Actions
        .createTao()
        .then(() => {
          this.isDisabled = null;
          this.$scope.$apply();
        });
    }
    removeTao(taoId) {
      return () => {
        this.isDisabled = true;
        this.Actions
          .removeTao(taoId)
          .then(() => {
            this.isDisabled = null;
            this.$scope.$apply();
          });
      };
    }
    archiveTao(taoId) {
      return () => {
        this.isDisabled = true;
        this.Actions
          .archiveTao(taoId)
          .then(() => {
            this.isDisabled = null;
            this.$scope.$apply();
          });
      };
    }
    unarchiveTao(taoId) {
      return () => {
        this.isDisabled = true;
        this.Actions
          .unarchiveTao(taoId)
          .then(() => {
            this.isDisabled = null;
            this.$scope.$apply();
          });
      };
    }
    editTao(taoId) {
      return () => {
        this.$rootRouter.navigate(['WebcatEditor', {
          taoId: taoId
        }]);
      };
    }
  }
  angular
    .module('dashboard')
    .component('dashboardDocuments', {
      templateUrl: 'components/private/dashboard/documents/documents.html',
      controller: Controller,
      bindings: {
        isDisabled: '='
      }
    }).constant('DashboardDocumentsLbl', {
      es: {
        NEW_DOCUMENT: 'Nuevo Documento',
        PUBLISHED: 'Publicado',
        UNPUBLISHED: 'Sin Publicar'
      }
    });
}());
