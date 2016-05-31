(function () {
  'use strict';
  class Controller {
    constructor(UserActions) {
      this.UserActions = UserActions;
      this.UserActions.onUnauth(() => {
        this.$router.navigate(['Landing']);
      });
    }
  }
  angular
    .module('dashboard', ['ngFileUpload', 'angular-medium-editor'])
    .component('dashboardEl', {
      templateUrl: 'components/private/dashboard/dashboard.html',
      controller: Controller,
      bindings: {
        $router: '<'
      }
    });
}());
