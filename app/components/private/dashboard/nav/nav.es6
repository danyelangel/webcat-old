(function () {
  'use strict';
  class Controller {
    constructor(UserActions) {
      this.Actions = UserActions;
    }
    logout() {
      this.Actions.logout();
    }
  }
  angular
    .module('dashboard')
    .component('dashboardNav', {
      templateUrl: 'components/private/dashboard/nav/nav.html',
      controller: Controller
    });
}());
