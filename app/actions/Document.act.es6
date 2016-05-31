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
      let errorDialog = this.$dialog.error('REMOVE_SECTION');
      return new Promise((resolve) => {
        this.Document
          .removeSection(sectionId, docId)
          .then(resolve)
          .catch(errorDialog(resolve));
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
      let errorDialog = this.$dialog.error('REMOVE_SECTION_IMAGE');
      return new Promise((resolve) => {
        this.Document
          .removeSectionImage(sectionId, docId)
          .then(resolve)
          .catch(errorDialog(resolve));
      });
    }
  }
  angular
    .module('tao')
    .service('DocumentActions', Service);

  angular.module('tao').constant('DocumentLabels', {
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
        }
      }
    },
    progress: {
      es: {
        UPLOAD_SECTION_IMAGE: 'Subiendo Imagen'
      }
    }
  });
}());
