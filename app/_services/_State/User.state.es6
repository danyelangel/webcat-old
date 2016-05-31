(function () {
  'use strict';
  class Service {
    constructor(Database, Firebase, $rootScope) {
      this.$rootScope = $rootScope;
      this.Database = Database;
      this.firebase = Firebase.firebase;
      this.getUserId();
      // Initialize variables
      this.userProfile = {};
      this.uid = {};
      this.userTaos = {};
    }
    getUserId() {
      let usr = this.firebase.auth().currentUser;
      if (usr !== null) {
        this.getUserProfile(usr.uid);
        this.getUserTaos(usr.uid);
      }
      this.firebase
        .auth()
        .onAuthStateChanged((user) => {
          if (user !== null) {
            this.getUserProfile(user.uid);
            this.getUserTaos(user.uid);
            this.uid = user.uid;
          }
        });
    }
    getUserProfile(uid) {
      let ref = this.Database.getUserProfileRef(uid);
      this.Database.watch(ref, (data) => {
        this.userProfile = data;
        this.$rootScope.$apply();
      });
    }
    getUserTaos(uid) {
      let ref = this.Database.getUserTaosRef(uid);
      this.Database.watch(ref, (data) => {
        this.userTaos = data;
        this.$rootScope.$apply();
      });
    }
  }
  angular
    .module('tao')
    .service('UserState', Service);
}());
