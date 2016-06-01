(function () {
  'use strict';
  class Service {
    constructor(UserApi, UserState, Database, DocumentApi, Lang, TaoState, DocumentState) {
      this.Database = Database;
      this.User = UserApi;
      this.UserState = UserState;
      this.Document = DocumentApi;
      this.DocumentState = DocumentState;
      this.Lang = Lang;
      this.TaoState = TaoState;
    }
    createTao(title) {
      let uid = this.UserState.uid;
      return new Promise((resolve, reject) => {
        this.User
          .createToken()
          .then((tokenObj) => {
            this.pushTao(title, tokenObj)
              .then(this.User.addTao(tokenObj.id, uid))
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      });
    }
    pushTao(title, tokenObj) {
      let ref = this.Database.getTaoRef(tokenObj.id),
          uid = this.UserState.uid,
          taoId = tokenObj.id,
          token = tokenObj.token;
      return new Promise((resolve, reject) => {
        this.Database
          .set(ref.child('token'), token)
          .then(this.addCollaborator(uid, taoId))
          .then(this.addLanguage(title, this.Lang.$current, taoId))
          .then(this.archive(taoId))
          .then(resolve)
          .catch(reject);
      });
    }
    removeTao(taoId) {
      let tao = this.TaoState.getTao(taoId),
          languages = tao.languages,
          collaborators = tao.collaborators,
          i = 0,
          documentIds = [],
          collaboratorIds = [];
      angular.forEach(languages, (value) => {
        documentIds[i] = value;
        i++;
      });
      i = 0;
      angular.forEach(collaborators, (value, key) => {
        collaboratorIds[i] = key;
        i++;
      });
      return Promise
        .all([
          this.Document
            .removeMany(documentIds),
          this.User
            .removeTaoMany(taoId, collaboratorIds)
        ])
        .then(this.removeAllLanguages(taoId))
        .then(this.removeIsArchived(taoId))
        .then(this.removeAllCollaborators(taoId))
        .then(this.removeToken(taoId))
        .then(this.User.removeToken(taoId));
    }
    addCollaborator(userId, taoId) {
      let ref = this.Database
        .getTaoRef(taoId)
        .child('collaborators')
        .child(userId);
      return new Promise((resolve, reject) => {
        this.Database
          .set(ref, true)
          .then(resolve)
          .catch(reject);
      });
    }
    removeAllCollaborators(taoId) {
      let rootRef = this.Database.getTaoRef(taoId),
          ref = rootRef.child('collaborators');
      return () => {
        return this.Database.set(ref, null);
      };
    }
    removeIsArchived(taoId) {
      let rootRef = this.Database.getTaoRef(taoId),
          ref = rootRef.child('isArchived');
      return () => {
        return this.Database.set(ref, null);
      };
    }
    removeAllLanguages(taoId) {
      let rootRef = this.Database.getTaoRef(taoId),
          ref = rootRef.child('languages');
      return () => {
        return this.Database.set(ref, null);
      };
    }
    removeToken(taoId) {
      let rootRef = this.Database.getTaoRef(taoId),
          ref = rootRef.child('token');
      return () => {
        return this.Database.set(ref, null);
      };
    }
    addLanguage(title, languageId, taoId) {
      let ref = this.Database
        .getTaoRef(taoId)
        .child('languages')
        .child(languageId);
      return new Promise((resolve, reject) => {
        this.Document
          .create(languageId)
          .then((docId) => {
            this.Database
              .set(ref, docId)
              .then(this.Document.populate(title, taoId, docId))
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      });
    }
    archive(taoId) {
      let rootRef = this.Database.getTaoRef(taoId),
          ref = rootRef.child('isArchived');
      return this.Database.set(ref, true);
    }
    unarchive(taoId) {
      let rootRef = this.Database.getTaoRef(taoId),
          ref = rootRef.child('isArchived');
      return this.Database.set(ref, false);
    }
  }
  angular
    .module('tao')
    .service('TaoApi', Service);
}());
