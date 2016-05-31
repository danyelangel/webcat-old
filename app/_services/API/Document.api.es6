(function () {
  'use strict';
  class Service {
    constructor(Database, Image, DocumentState) {
      this.Database = Database;
      this.Image = Image;
      this.State = DocumentState;
    }
    create(languageId) {
      let uniqueId = this.Database.uniqueId(),
          ref = this.Database
        .getDocumentsRef()
        .child(uniqueId)
        .child('languageId');
      return new Promise((resolve, reject) => {
        this.Database
          .set(ref, languageId)
          .then(() => {
            resolve(uniqueId);
          })
          .catch(reject);
      });
    }
    populate(title, taoId, docId) {
      let ref = this.Database.getDocumentsRef()
        .child(docId)
        .child('taoId');
      return new Promise((resolve, reject) => {
        this.Database
          .set(ref, taoId)
          .then(() => {
            this.setTitle(title, docId)
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      });
    }
    setTitle(title, docId) {
      let ref = this.Database.getDocumentsRef()
        .child(docId)
        .child('data/metadata/title');
      return new Promise((resolve, reject) => {
        this.Database.set(ref, title)
          .then(resolve)
          .catch(reject);
      });
    }
    remove(docId) {
      let rootRef = this.Database.getDocumentsRef(),
          ref = rootRef.child(docId);
      return this.Database.set(ref, null);
    }
    removeMany(documentIds) {
      let promises = [];
      angular.forEach(documentIds, (value, key) => {
        promises[key] = this.remove(value);
      });
      return Promise.all(promises);
    }
    addSection(docId, priority) {
      let uniqueId = this.Database.uniqueId(),
          rootRef = this.Database.getDocSectionsRef(docId),
          ref = rootRef.child(uniqueId),
          data = {
            sectionId: uniqueId,
            priority: priority,
            display: {
              hasBackgroundBlur: true,
              hasBackgroundImage: false
            }
          };
      return this.Database.set(ref, data);
    }
    removeSection(sectionId, docId) {
      let rootRef = this.Database.getDocSectionsRef(docId),
          ref = rootRef.child(sectionId);
      return this.Database.set(ref, null);
    }
    updateSection(data, sectionId, docId) {
      let rootRef = this.Database.getDocSectionsRef(docId),
          ref = rootRef.child(sectionId);
      delete data.$$hashKey;
      return this.Database.set(ref, data);
    }
    uploadSectionImage(file, sectionId, docId, progressDialog) {
      let rootRef = this.Database.getDocSectionsRef(docId),
          ref = rootRef.child(sectionId).child('content/image'),
          section = this.State.getSection(sectionId, docId),
          currentImageRef;
      if (angular.isObject(section.content)) {
        if (section.content.image) {
          currentImageRef = section.content.image.imageRef;
        }
      }
      return new Promise((resolve, reject) => {
        this.Image
          .upload(file, progressDialog)
          .then((imageData) => {
            this.Database
              .set(ref, imageData)
              .then(this.Image.remove(currentImageRef))
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      });
    }
    removeSectionImage(sectionId, docId) {
      let rootRef = this.Database.getDocSectionsRef(docId),
          ref = rootRef.child(sectionId).child('content/image'),
          section = this.State.getSection(sectionId, docId),
          currentImageRef;
      if (angular.isObject(section.content)) {
        if (section.content.image) {
          currentImageRef = section.content.image.imageRef;
        }
      }
      return new Promise((resolve, reject) => {
        this.Image
          .remove(currentImageRef)
          .then(this.Database.set(ref, null))
          .then(resolve)
          .catch(reject);
      });
    }
  }
  angular
    .module('tao')
    .service('DocumentApi', Service);
}());
