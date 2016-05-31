(function () {
  'use strict';
  class Service {
    constructor(TaoApi, Dialog, TaosLabels) {
      this.$dialog = Dialog.$dialog(TaosLabels);
      // Services
      this.Taos = TaoApi;
    }
    createTao() {
      let promptDialog = this.$dialog.prompt('CREATE_TAO'),
          errorDialog = this.$dialog.error('CREATE_TAO');
      return new Promise((resolve) => {
        promptDialog()
          .then((title) => {
            this.Taos
              .createTao(title)
              .then(resolve)
              .catch(errorDialog(resolve));
          })
          .catch(resolve);
      });
    }
    removeTao(taoId) {
      let confirmDialog = this.$dialog.confirm('REMOVE_TAO'),
          errorDialog = this.$dialog.error('REMOVE_TAO');
      return new Promise((resolve) => {
        confirmDialog()
          .then(() => {
            this.Taos
              .removeTao(taoId)
              .then(resolve)
              .catch(errorDialog(resolve));
          })
          .catch(resolve);
      });
    }
    addCollaborator(userId, taoId) {
      let errorDialog = this.$dialog.error('ADD_COLLABORATOR');
      return new Promise((resolve) => {
        this.Taos
          .addCollaborator(userId, taoId)
          .then(resolve)
          .catch(errorDialog(resolve));
      });
    }
    removeCollaborator(userId, taoId) {
      let confirmDialog = this.$dialog.confirm('REMOVE_COLLABORATOR'),
          errorDialog = this.$dialog.error('REMOVE_COLLABORATOR');
      return new Promise((resolve) => {
        confirmDialog()
          .then(() => {
            this.Taos
              .removeCollaborator(userId, taoId)
              .then(resolve)
              .catch(errorDialog(resolve));
          })
          .catch(resolve);
      });
    }
    archiveTao(taoId) {
      let errorDialog = this.$dialog.error('ARCHIVE_TAO');
      return new Promise((resolve) => {
        this.Taos
          .archive(taoId)
          .then(resolve)
          .catch(errorDialog(resolve));
      });
    }
    unarchiveTao(taoId) {
      let errorDialog = this.$dialog.error('UNARCHIVE_TAO');
      return new Promise((resolve) => {
        this.Taos
          .unarchive(taoId)
          .then(resolve)
          .catch(errorDialog(resolve));
      });
    }
    addLanguage(languageId, taoId) {
      let errorDialog = this.$dialog.error('ADD_LANGUAGE');
      return new Promise((resolve) => {
        this.Taos
          .addLanguage(languageId, taoId)
          .then(resolve)
          .catch(errorDialog(resolve));
      });
    }
    removeLanguage(languageId, taoId) {
      let errorDialog = this.$dialog.error('REMOVE_LANGUAGE'),
          confirmDialog = this.$dialog.confirm('REMOVE_LANGUAGE');
      return new Promise((resolve) => {
        confirmDialog()
          .then(() => {
            this.Taos
              .removeLanguage(languageId, taoId)
              .then(resolve)
              .catch(errorDialog(resolve));
          })
          .catch(resolve);
      });
    }
    updateLanguage(newLanguageId, oldLanguageId, taoId) {
      let errorDialog = this.$dialog.error('UPDATE_LANGUAGE');
      return new Promise((resolve) => {
        this.Taos
          .updateLanguage(newLanguageId, oldLanguageId, taoId)
          .then(resolve)
          .catch(errorDialog(resolve));
      });
    }
    publishLanguage(languageId, taoId) {
      let errorDialog = this.$dialog.error('PUBLISH_LANGUAGE');
      return new Promise((resolve) => {
        this.Taos
          .publishLanguage(languageId, taoId)
          .then(resolve)
          .catch(errorDialog(resolve));
      });
    }
    unpublishLanguage(languageId, taoId) {
      let errorDialog = this.$dialog.error('UNPUBLISH_LANGUAGE');
      return new Promise((resolve) => {
        this.Taos
          .unpublishLanguage(languageId, taoId)
          .then(resolve)
          .catch(errorDialog(resolve));
      });
    }
  }
  angular
    .module('tao')
    .service('TaoActions', Service);

  angular.module('tao').constant('TaosLabels', {
    error: {
      es: {
        CREATE_TAO: {
          title: 'Error',
          description: 'Error de creacion'
        },
        REMOVE_TAO: {
          title: 'Error',
          description: 'No se pudo remover'
        }
      }
    },
    prompt: {
      es: {
        CREATE_TAO: {
          title: 'Ingrese título',
          description: 'Título'
        }
      }
    },
    confirm: {
      es: {
        REMOVE_TAO: {
          title: 'Seguro que desea remover',
          description: 'No se puede deshacer'
        }
      }
    }
  });
}());
