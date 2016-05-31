(function () {
  'use strict';

  angular
    .module('dashboard')
    .config(config);

  function config($mdThemingProvider) {
    $mdThemingProvider.theme('dashboard')
      .primaryPalette('blue', {
        default: '500'
      })
      .accentPalette('orange', {
        default: '700'
      });
    $mdThemingProvider.theme('db-light')
      .primaryPalette('grey', {
        default: '50'
      })
      .accentPalette('blue', {
        default: '500'
      });
    $mdThemingProvider.theme('db-light-btn')
      .primaryPalette('grey', {
        default: '500'
      })
      .accentPalette('blue', {
        default: '300'
      });
  }
}());
