(function () {
  'use strict';
  class Service {
    constructor(DocumentApi, Dialog, DocumentLabels) {
      this.$dialog = Dialog.$dialog(DocumentLabels);
      // Services
      this.Document = DocumentApi;
    }
    addSection(docId, priority) {
      let errorDialog = this.$dialog.error('ADD_SECTION');
      return new Promise((resolve) => {
        this.Document
          .addSection(docId, priority)
          .then(resolve)
          .catch(errorDialog(resolve));
      });
    }
    removeSection(sectionId, docId) {
      let confirmDialog = this.$dialog.confirm('REMOVE_SECTION'),
          errorDialog = this.$dialog.error('REMOVE_SECTION');
      return new Promise((resolve) => {
        confirmDialog()
          .then(() => {
            this.Document
              .removeSection(sectionId, docId)
              .then(resolve)
              .catch(errorDialog(resolve));
          })
          .catch(resolve);
      });
    }
    updateSection(data, sectionId, docId) {
      let errorDialog = this.$dialog.error('UPDATE_SECTION');
      return new Promise((resolve) => {
        this.Document
          .updateSection(data, sectionId, docId)
          .then(resolve)
          .catch(errorDialog(resolve));
      });
    }
    uploadSectionImage(file, sectionId, docId) {
      let errorDialog = this.$dialog.error('UPLOAD_SECTION_IMAGE'),
          progressDialog = this.$dialog.progress('UPLOAD_SECTION_IMAGE');
      return new Promise((resolve) => {
        this.Document
          .uploadSectionImage(file, sectionId, docId, progressDialog)
          .then(resolve)
          .catch(errorDialog(resolve));
      });
    }
    removeSectionImage(sectionId, docId) {
      let confirmDialog = this.$dialog.confirm('REMOVE_SECTION_IMAGE'),
          errorDialog = this.$dialog.error('REMOVE_SECTION_IMAGE');
      return new Promise((resolve) => {
        confirmDialog()
          .then(() => {
            this.Document
              .removeSectionImage(sectionId, docId)
              .then(resolve)
              .catch(errorDialog(resolve));
          })
          .catch(resolve);
      });
    }
    updateMetadata(data, docId) {
      let errorDialog = this.$dialog.error('UPDATE_METADATA');
      return new Promise((resolve) => {
        this.Document
          .updateMetadata(data, docId)
          .then(resolve)
          .catch(errorDialog(resolve));
      });
    }
    uploadThumbnailImage(file, docId) {
      let errorDialog = this.$dialog.error('UPLOAD_METADATA_IMAGE'),
          progressDialog = this.$dialog.progress('UPLOAD_METADATA_IMAGE');
      return new Promise((resolve) => {
        this.Document
          .uploadThumbnailImage(file, docId, progressDialog)
          .then(resolve)
          .catch(errorDialog(resolve));
      });
    }
    removeThumbnailImage(docId) {
      let confirmDialog = this.$dialog.confirm('REMOVE_METADATA_IMAGE'),
          errorDialog = this.$dialog.error('REMOVE_METADATA_IMAGE');
      return new Promise((resolve) => {
        confirmDialog()
          .then(() => {
            this.Document
              .removeThumbnailImage(docId)
              .then(resolve)
              .catch(errorDialog(resolve));
          })
          .catch(resolve);
      });
    }
    addSectionYoutube(sectionId, docId) {
      let promptDialog = this.$dialog.prompt('ADD_SECTION_YOUTUBE'),
          errorDialog = this.$dialog.error('ADD_SECTION_YOUTUBE');
      return new Promise(resolve => {
        promptDialog()
          .then(link => {
            this.Document
              .removeSectionImage(sectionId, docId)
              .then(() => {
                this.Document
                  .addSectionYoutube(link, sectionId, docId)
                  .then(resolve)
                  .catch(errorDialog(resolve));
              })
              .catch(errorDialog(resolve));
          })
          .catch(resolve);
      });
    }
  }
  angular
    .module('tao')
    .service('DocumentActions', Service)
    .constant('DocumentLabels', {
      errors: {
        es: {
          ADD_SECTION: {
            title: 'Error',
            description: 'No se pudo añadir seccion'
          },
          UPDATE_SECTION: {
            title: 'Error',
            description: 'No se pudo actualizar seccion'
          },
          REMOVE_SECTION: {
            title: 'Error',
            description: 'No se pudo remover seccion'
          },
          UPLOAD_SECTION_IMAGE: {
            title: 'Error',
            description: 'No se pudo subir imagen'
          },
          REMOVE_SECTION_IMAGE: {
            title: 'Error',
            description: 'No se pudo remover imagen'
          },
          UPDATE_METADATA: {
            title: 'Error',
            description: 'No se pudo actualizar la info del doc'
          },
          UPLOAD_METADATA_IMAGE: {
            title: 'Error',
            description: 'No se pudo subir imagen'
          },
          REMOVE_METADATA_IMAGE: {
            title: 'Error',
            description: 'No se pudo remover imagen'
          },
          ADD_SECTION_YOUTUBE: {
            title: 'Error',
            description: 'No se pudo subir el video'
          }
        }
      },
      confirm: {
        es: {
          REMOVE_SECTION: {
            title: 'Seguro remover seccion?',
            description: 'Esta accion no se puede deshacer'
          },
          REMOVE_SECTION_IMAGE: {
            title: 'Seguro remover imagen?',
            description: 'Esta accion no se puede deshacer'
          },
          REMOVE_METADATA_IMAGE: {
            title: 'Seguro remover imagen?',
            description: 'Esta accion no se puede deshacer'
          }
        }
      },
      progress: {
        es: {
          UPLOAD_SECTION_IMAGE: 'Subiendo Imagen',
          UPLOAD_METADATA_IMAGE: 'Subiendo Imagen'
        }
      },
      prompt: {
        es: {
          ADD_SECTION_YOUTUBE: 'Ingresa el link del video de youtube'
        }
      }
    });
}());
