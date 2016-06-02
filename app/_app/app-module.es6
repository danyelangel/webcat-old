(function () {
  'use strict';

  /* @ngdoc object
   * @name webcat
   * @description
   *
   */
  angular
    .module('webcat', [
      'ngMaterial',
      'ngComponentRouter',
      'tao',
      'landing',
      'dashboard',
      'webcatEditor',
      'webcatRender'
    ]);
}());
