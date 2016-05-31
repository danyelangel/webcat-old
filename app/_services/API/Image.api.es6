(function () {
  'use strict';
  class Service {
    constructor(Database, Storage, $rootScope, Dialog) {
      this.Database = Database;
      this.Storage = Storage;
      this.Dialog = Dialog;
      this.$rootScope = $rootScope;
    }
    upload(file, progressDialog) {
      return new Promise((resolve, reject) => {
        let uniqueId = this.Database.uniqueId(),
            progress = {};
        progressDialog(progress);
        this.Storage
          .upload(file, uniqueId, (progressPercentage) => {
            progress.percentage = progressPercentage;
            this.$rootScope.$apply();
            if (progress.percentage > 99) {
              this.Dialog.hide();
            }
          })
          .then(resolve)
          .catch(reject);
      });
    }
    remove(imageRef) {
      return new Promise((resolve, reject) => {
        if (imageRef) {
          this.Storage
            .remove(imageRef)
            .then(resolve)
            .catch(reject);
        } else {
          resolve();
        }
      });
    }
  }
  angular
    .module('tao')
    .service('Image', Service);
}());
