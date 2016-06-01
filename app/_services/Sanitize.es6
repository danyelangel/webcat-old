(function () {
  'use strict';
  class Service {
    constructor($sce) {
      this.$sce = $sce;
    }
    $html() {
      return (data) => {
        return this.$sce.trustAsHtml(data);
      };
    }
  }
  angular
    .module('tao')
    .service('Sanitize', Service);
}());
