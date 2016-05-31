(function () {
  'use strict';

  angular
    .module('webcatEditor')
    .config(config);

  function config($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('grey', {
        default: '700'
      })
      .accentPalette('blue', {
        default: '500'
      });
  }
}());
