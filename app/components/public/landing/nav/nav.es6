(function () {
  'use strict';
  class Controller {
    constructor(UserActions) {
      this.Actions = UserActions;
    }
    login() {
      this.Actions.login();
    }
  }
  angular
    .module('landing')
    .component('landingNav', {
      templateUrl: 'components/public/landing/nav/nav.html',
      controller: Controller
    });
}());
