(function () {
  'use strict';
  class Service {
    constructor(Database, $rootScope) {
      this.Database = Database;
      this.$rootScope = $rootScope;
      this.taos = {};
    }
    getTao(taoId) {
      let rootRef = this.Database.getTaoRef(taoId),
          languagesRef = rootRef.child('languages'),
          collaboratorsRef = rootRef.child('collaborators'),
          isArchivedRef = rootRef.child('isArchived');
      if (!angular.isObject(this.taos[taoId])) {
        this.taos[taoId] = {
          languages: {},
          collaborators: {}
        };
        this.Database.watch(languagesRef, (data) => {
          this.taos[taoId].languages = data;
          this.$rootScope.$apply();
        });
        this.Database.watch(isArchivedRef, (data) => {
          this.taos[taoId].isArchived = data;
        });
        this.Database.watch(collaboratorsRef, (data) => {
          this.taos[taoId].collaborators = data;
          this.$rootScope.$apply();
        });
      }
      return this.taos[taoId];
    }
  }
  angular
    .module('tao')
    .service('TaoState', Service);
}());
