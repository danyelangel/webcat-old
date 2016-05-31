(function () {
  'use strict';
  class Service {
    constructor(Database, $rootScope, $timeout) {
      this.Database = Database;
      this.$rootScope = $rootScope;
      this.$timeout = $timeout;
      this.docs = {};
    }
    getDocumentMetadata(docId) {
      let rootRef = this.Database.getDocRef(docId).child('data'),
          metadataRef = rootRef.child('metadata');
      if (!angular.isObject(this.docs[docId])) {
        this.docs[docId] = {
          metadata: {}
        };
        this.Database.watch(metadataRef, (data) => {
          this.docs[docId].metadata = data;
          this.$timeout(() => {
            this.$rootScope.$apply();
          });
        });
      }
      return this.docs[docId];
    }
    getDoc(docId) {
      let rootRef = this.Database.getDocRef(docId).child('data'),
          sectionsRef = rootRef.child('sections');
      this.getDocumentMetadata(docId);
      if (!angular.isObject(this.docs[docId].sections)) {
        this.docs[docId].sections = [];
        this.Database.watch(sectionsRef, (data) => {
          let sections = [];
          if (angular.isObject(data)) {
            sections = Object.keys(data).map((k) => data[k]);
          }
          sections.sort((a, b) => {
            return parseFloat(a.priority) - parseFloat(b.priority);
          });
          this.docs[docId].sections = sections;
          this.$timeout(() => {
            this.$rootScope.$apply();
          });
        });
      }
      return this.docs[docId];
    }
    getSection(sectionId, docId) {
      let rootRef = this.Database.getDocRef(docId).child('data'),
          sectionRef = rootRef.child('sections').child(sectionId);
      this.getDocumentMetadata(docId);
      if (!angular.isObject(this.docs[docId].sectionsObj)) {
        this.docs[docId].sectionsObj = {};
        this.Database.watch(sectionRef, (data) => {
          this.docs[docId].sectionsObj[sectionId] = data;
          this.$timeout(() => {
            this.$rootScope.$apply();
          });
        });
      }
      return this.docs[docId].sectionsObj[sectionId];
    }
  }
  angular
    .module('tao')
    .service('DocumentState', Service);
}());
