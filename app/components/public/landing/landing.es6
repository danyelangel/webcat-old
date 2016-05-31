(function () {
  'use strict';
  class Controller {
    constructor(UserState, UserActions) {
      this.State = UserState;
      this.UserActions = UserActions;
      this.UserActions.onAuth(() => {
        this.$router.navigate(['Dashboard']);
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
