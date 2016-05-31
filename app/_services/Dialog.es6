(function () {
  'use strict';
  class Service {
    constructor(Lang, DialogLabels, $mdDialog) {
      this.Lang = Lang;
      this.Labels = DialogLabels;
      this.$mdDialog = $mdDialog;
    }
    $dialog(labels) {
      return {
        error: (labelId) => {
          return (callback) => {
            return () => {
              let alert = this.$mdDialog
                .alert()
                .title(labels.error[this.Lang.$current][labelId].title)
                .textContent(labels.error[this.Lang.$current][labelId].description)
                .ariaLabel(labels.error[this.Lang.$current][labelId].description)
                .ok(this.Labels[this.Lang.$current].OK);
              this.$mdDialog.show(alert).then(callback);
            };
          };
        },
        progress: (labelId) => {
          return (progress) => {
            let self = this;
            this.$mdDialog
              .show({
                templateUrl: 'components/dialogs/progressDialog.html',
                controller: function () {
                  this.progress = progress;
                  this.title = labels.progress[self.Lang.$current][labelId];
                },
                controllerAs: '$ctrl'
              });
          };
        },
        prompt: (labelId) => {
          return () => {
            return new Promise((resolve, reject) => {
              let prompt = this.$mdDialog
                .prompt()
                .title(labels.prompt[this.Lang.$current][labelId].title)
                .textContent(labels.prompt[this.Lang.$current][labelId].description)
                .ariaLabel(labels.prompt[this.Lang.$current][labelId].description)
                .ok(this.Labels[this.Lang.$current].OK)
                .cancel(this.Labels[this.Lang.$current].CANCEL);
              this.$mdDialog
                .show(prompt)
                .then(resolve)
                .catch(reject);
            });
          };
        },
        confirm: (labelId) => {
          return () => {
            return new Promise((resolve, reject) => {
              let confirmLabels = labels.confirm[this.Lang.$current][labelId],
                  confirm = this.$mdDialog
                .confirm()
                .title(confirmLabels.title)
                .textContent(confirmLabels.description)
                .ariaLabel(confirmLabels.description)
                .ok(this.Labels[this.Lang.$current].OK)
                .cancel(this.Labels[this.Lang.$current].CANCEL);
              this.$mdDialog
                .show(confirm)
                .then(resolve)
                .catch(reject);
            });
          };
        }
      };
    }
    hide() {
      this.$mdDialog.hide();
    }
  }
  angular
    .module('tao')
    .service('Dialog', Service);
  angular
    .module('tao')
    .constant('DialogLabels', {
      es: {
        OK: 'Ok',
        CANCEL: 'Cancelar'
      },
      en: {
        OK: 'Ok',
        CANCEL: 'Cancel'
      }
    });
}());
