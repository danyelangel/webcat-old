(function () {
  'use strict';
  class Controller {
    constructor(UserActions, $anchorScroll) {
      this.UserActions = UserActions;
      this.UserActions.onUnauth(() => {
        this.$router.navigate(['Landing']);
      });
      this.$anchorScroll = $anchorScroll;
    }
    $routerOnActivate() {
      this.$anchorScroll('scrollTop');
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
