(function () {
  'use strict';
  class Service {
    constructor(Firebase) {
      this.storage = Firebase.firebase.storage;
    }
    upload(file, uniqueId, progressCallback) {
      return new Promise((resolve, reject) => {
        let ref = this.storage().ref('images/' + uniqueId),
            uploadTask = ref.put(file);
        uploadTask
          .on('state_changed', (snapshot) => {
            let progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            progressCallback(progress);
          }, (error) => {
            console.log(error);
            reject(error);
          }, () => {
            let imageUrl = uploadTask.snapshot.downloadURL,
                imageRef = 'images/' + uniqueId;
            resolve({
              imageRef: imageRef,
              imageUrl: imageUrl
            });
          });
      });
    }
    remove(fileRef) {
      return new Promise((resolve, reject) => {
        this.storage()
          .ref(fileRef)
          .delete()
          .then(resolve)
          .catch(reject);
      });
    }
  }
  angular
    .module('tao')
    .service('Storage', Service);
}());
