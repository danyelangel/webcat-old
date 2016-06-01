(function () {
  'use strict';
  class Service {
    constructor(Firebase) {
      this.database = Firebase.firebase.database();
      this.rootRef = this.database.ref();
    }
    getOnce(ref) {
      return new Promise((resolve, reject) => {
        ref.once('value')
          .then((snapshot) => {
            resolve(snapshot.val());
          })
          .catch(reject);
      });
    }
    watch(ref, callback) {
      ref.once('value').then(cb);
      ref.on('value', cb);
      return {
        ref: ref,
        cb: cb
      };
      function cb(snapshot) {
        callback(snapshot.val());
      }
    }
    unwatch(ref, cb) {
      ref.off('value', cb);
    }
    set(ref, data) {
      return ref.set(data);
    }
    push(ref, data) {
      let key = this.uniqueId();
      return new Promise((resolve, reject) => {
        this.set(ref.child(key), data)
          .then(() => {
            resolve(key);
          })
          .catch(reject);
      });
    }
    uniqueId() {
      return this.database.ref('uniqueIds').push().key;
    }
    getUserProfileRef(uid) {
      return this.rootRef
        .child('users')
        .child(uid)
        .child('public/profile');
    }
    getUserTaosRef(uid) {
      return this.rootRef
        .child('users')
        .child(uid)
        .child('public/taos');
    }
    getUserTokensRef(uid) {
      return this.rootRef
        .child('users')
        .child(uid)
        .child('private/tokens');
    }
    getTaoRef(taoId) {
      return this.rootRef
        .child('taos')
        .child(taoId);
    }
    getDocRef(docId) {
      return this.rootRef
        .child('documents')
        .child(docId);
    }
    getDocSectionsRef(docId) {
      return this.rootRef
        .child('documents')
        .child(docId)
        .child('data/sections');
    }
    getDocumentsRef() {
      return this.rootRef
        .child('documents');
    }
  }
  angular
    .module('tao')
    .service('Database', Service);
}());
