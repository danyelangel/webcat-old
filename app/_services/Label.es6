(function () {
  'use strict';
  class Service {
    constructor(Lang) {
      this.Lang = Lang;
    }
    $l(labels) {
      return (labelId) => {
        return labels[this.Lang.$current][labelId];
      };
    }
  }
  angular
    .module('tao')
    .service('Label', Service);
}());
