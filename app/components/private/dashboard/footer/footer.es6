(function () {
  'use strict';
  class Controller {
    constructor() {
    }
  }
  angular
    .module('dashboard')
    .component('dashboardFooter', {
      templateUrl: 'components/private/dashboard/footer/footer.html',
      controller: Controller
    });
}());
