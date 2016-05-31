(function () {
  'use strict';
  class Service {
    constructor(Firebase, Database, Image, UserState) {
      this.firebase = Firebase.firebase;
      this.UserState = UserState;
      this.Database = Database;
      this.Image = Image;
    }
    login(provider) {
      console.log(provider);
      let email = 'danyelangel@gmail.com',
          password = 'dani1234';
      this.firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    }
    onAuth(callback) {
      this.firebase
        .auth()
        .onAuthStateChanged((user) => {
          if (user) {
            callback(user);
          }
        });
    }
    onUnauth(callback) {
      this.firebase
        .auth()
        .onAuthStateChanged((user) => {
          if (!user) {
            callback();
          }
        });
    }
    logout() {
      return new Promise((resolve) => {
        this.firebase
          .auth()
          .signOut()
          .then(resolve);
      });
    }
    updateProfile(profileData) {
      return new Promise((resolve, reject) => {
        let uid = this.UserState.uid,
            ref = this.Database.getUserProfileRef(uid);
        this.Database
          .set(ref, profileData)
          .then(resolve)
          .catch(reject);
      });
    }
    updateAvatar(file, progressDialog) {
      let uid = this.UserState.uid,
          ref = this.Database.getUserProfileRef(uid),
          currentImageRef;
      if (this.UserState.userProfile.avatar) {
        currentImageRef = this.UserState.userProfile.avatar.imageRef;
      }
      return new Promise((resolve, reject) => {
        this.Image
          .upload(file, progressDialog)
          .then((avatarData) => {
            this.Database
              .set(ref.child('avatar'), avatarData)
              .then(() => {
                this.Image
                  .remove(currentImageRef)
                  .then(resolve)
                  .catch(reject);
              })
              .catch(reject);
          })
          .catch(reject);
      });
    }
    createToken() {
      return new Promise((resolve, reject) => {
        let uid = this.UserState.uid,
            ref = this.Database.getUserTokensRef(uid),
            uniqueToken = this.Database.uniqueId();
        this.Database
          .push(ref, uniqueToken)
          .then((key) => {
            let tokenObj = {
              id: key,
              token: uniqueToken
            };
            resolve(tokenObj);
          })
          .catch(reject);
      });
    }
    addTao(taoId, uid) {
      let ref = this.Database.getUserTaosRef(uid).child(taoId);
      return this.Database.set(ref, true);
    }
    removeTao(taoId, uid) {
      let ref = this.Database.getUserTaosRef(uid).child(taoId);
      return this.Database.set(ref, null);
    }
    removeTaoMany(taoId, uids) {
      let promises = [];
      angular.forEach(uids, (uid, key) => {
        promises[key] = this.removeTao(taoId, uid);
      });
      return Promise.all(promises);
    }
    removeToken(taoId) {
      let uid = this.UserState.uid,
          rootRef = this.Database.getUserTokensRef(uid),
          ref = rootRef.child(taoId);
      return this.Database.set(ref, null);
    }
    removeProfile() {
    }
  }
  angular
    .module('tao')
    .service('UserApi', Service);
}());
