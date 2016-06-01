(function () {
  'use strict';
  class Service {
    constructor(Database, $rootScope, $timeout) {
      this.Database = Database;
      this.$rootScope = $rootScope;
      this.$timeout = $timeout;
      this.docs = {};
      this.listeners = [];
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
          sectionsRef = rootRef.child('sections'),
          listener;
      this.getDocumentMetadata(docId);
      if (!angular.isObject(this.docs[docId].sections)) {
        this.docs[docId].sections = [];
        listener = this.Database.watch(sectionsRef, (data) => {
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
        this.listeners.push(listener);
      }
      return this.docs[docId];
    }
    getSectionsAsync(docId) {
      let ref = this.Database.getDocRef(docId).child('data/sections');
      return this.Database.getOnce(ref);
    }
    getSectionAsync(sectionId, docId) {
      let rootRef = this.Database.getDocRef(docId),
          ref = rootRef.child('data/sections').child(sectionId);
      return this.Database.getOnce(ref);
    }
    getSection(sectionId, docId) {
      let ref = this.Database.getDocRef(docId).child('data/sections'),
          listener;
      this.getDocumentMetadata(docId);
      if (!angular.isObject(this.docs[docId].sectionsObj)) {
        this.docs[docId].sectionsObj = {};
        listener = this.Database.watch(ref, (data) => {
          this.docs[docId].sectionsObj = data;
          this.$timeout(() => {
            this.$rootScope.$apply();
          });
        });
        this.listeners.push(listener);
      }
      return this.docs[docId].sectionsObj[sectionId];
    }
    cleanUp() {
      angular.forEach(this.listeners, (listener) => {
        this.Database.unwatch(listener.ref, listener.cb);
      });
      this.listeners = [];
      this.docs = {};
    }
  }
  angular
    .module('tao')
    .service('DocumentState', Service);
}());
