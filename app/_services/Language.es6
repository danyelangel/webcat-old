(function () {
  'use strict';
  class Service {
    constructor() {
    }
    get $current() {
      return 'es';
    }
  }
  angular
    .module('tao')
    .service('Lang', Service);
}());
