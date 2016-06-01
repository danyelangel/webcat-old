(function () {
  'use strict';
  class Service {
    constructor(Database, Image, DocumentState) {
      this.Database = Database;
      this.Image = Image;
      this.State = DocumentState;
      this.displayDefaults = {
        hasBackgroundBlur: true,
        hasBackgroundImage: false,
        isBright: true
      };
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
          .then(this.setMetadata(docId, title))
          .then(resolve)
          .catch(reject);
      });
    }
    setMetadata(docId, title = '') {
      let ref = this.Database.getDocumentsRef()
        .child(docId)
        .child('data/metadata'),
          metadata = {
            title: title,
            description: `<p>${title}</p>`,
            display: {
              hasBackgroundBlur: true,
              isBright: true
            }
          };
      return new Promise((resolve, reject) => {
        this.Database.set(ref, metadata)
          .then(resolve)
          .catch(reject);
      });
    }
    remove(docId) {
      let rootRef = this.Database.getDocumentsRef(),
          ref = rootRef.child(docId);
      return new Promise((resolve, reject) => {
        Promise
          .all([
            this.removeAllSections(docId),
            this.removeThumbnailImage(docId)
          ])
          .then(() => {
            this.Database
              .set(ref, null)
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      });
    }
    removeMany(documentIds) {
      let promises = [];
      angular.forEach(documentIds, (docId, key) => {
        promises[key] = this.remove(docId);
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
            display: this.displayDefaults
          };
      return this.Database.set(ref, data);
    }
    removeSection(sectionId, docId) {
      let rootRef = this.Database.getDocSectionsRef(docId),
          ref = rootRef.child(sectionId);
      return new Promise((resolve, reject) => {
        this.removeSectionImage(sectionId, docId)
          .then(() => {
            this.Database
              .set(ref, null)
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      });
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
          currentImageRef;
      return new Promise((resolve, reject) => {
        this.State.getSectionAsync(sectionId, docId)
          .then((section) => {
            if (angular.isObject(section.content)) {
              if (section.content.image) {
                currentImageRef = section.content.image.imageRef;
              }
            }
            this.Image
              .remove(currentImageRef)
              .then(this.Database.set(ref, null))
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      });
    }
    removeAllSections(docId) {
      let promises = [];
      return new Promise((resolve, reject) => {
        this.State.getSectionsAsync(docId)
          .then((sections) => {
            angular.forEach(sections, (value, sectionId) => {
              promises.push(this.removeSection(sectionId, docId));
            });
            Promise.all(promises)
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      });
    }
    updateMetadata(data, docId) {
      let ref = this.Database.getDocumentsRef()
        .child(docId)
        .child('data/metadata');
      return this.Database.set(ref, data);
    }
    uploadThumbnailImage(file, docId, progressDialog) {
      let ref = this.Database.getDocumentsRef()
        .child(docId)
        .child('data/metadata/thumbnail'),
          doc = this.State.getDocumentMetadata(docId),
          currentImageRef;
      if (doc.metadata.thumbnail) {
        currentImageRef = doc.metadata.thumbnail.imageRef;
        console.log(currentImageRef);
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
    removeThumbnailImage(docId) {
      let ref = this.Database.getDocumentsRef()
        .child(docId)
        .child('data/metadata/thumbnail'),
          doc = this.State.getDocumentMetadata(docId),
          currentImageRef;
      if (doc.metadata.thumbnail) {
        currentImageRef = doc.metadata.thumbnail.imageRef;
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
