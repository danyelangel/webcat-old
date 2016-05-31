(function () {
  'use strict';
  class Service {
    constructor(UserApi, Dialog, UserLabels) {
      this.$dialog = Dialog.$dialog(UserLabels);
      // Services
      this.Users = UserApi;
    }
    login(provider) {
      this.Users
        .login(provider);
    }
    onAuth(callback) {
      this.Users.onAuth(callback);
    }
    onUnauth(callback) {
      this.Users.onUnauth(callback);
    }
    logout() {
      return new Promise((resolve) => {
        this.Users
          .logout()
          .then(resolve);
      });
    }
    updateProfile(profileData) {
      let errorDialog = this.$dialog.error('UPDATE_PROFILE');
      return new Promise((resolve) => {
        this.Users
          .updateProfile(profileData)
          .then(resolve)
          .catch(errorDialog(resolve));
      });
    }
    updateAvatar(file) {
      let errorDialog = this.$dialog.error('UPDATE_AVATAR'),
          progressDialog = this.$dialog.progress('UPDATE_AVATAR');
      return new Promise((resolve) => {
        this.Users
          .updateAvatar(file, progressDialog)
          .then(resolve)
          .catch(errorDialog(resolve));
      });
    }
    removeProfile() {
      let errorDialog = this.$dialog.error('REMOVE_PROFILE');
      return new Promise((resolve) => {
        this.Users
          .removeProfile()
          .then(resolve)
          .catch(errorDialog(resolve));
      });
    }
  }
  angular
    .module('tao')
    .service('UserActions', Service);

  angular
    .module('tao')
    .constant('UserLabels', {
      error: {
        es: {
          UPDATE_PROFILE: {
            title: 'No se pudo actualizar su perfil.',
            description: 'Intente de nuevo mas tarde'
          },
          UPDATE_AVATAR: {
            title: 'No se pudo actualizar su imagen de perfil.',
            description: 'Intente de nuevo mas tarde'
          },
          REMOVE_PROFILE: {
            title: 'No se pudo cerrar su perfil.',
            description: 'Intente de nuevo mas tarde'
          }
        },
        en: {
          UPDATE_PROFILE: {
            title: 'No se pudo actualizar su perfil.',
            description: 'Intente de nuevo mas tarde'
          },
          UPDATE_AVATAR: {
            title: 'No se pudo actualizar su imagen de perfil.',
            description: 'Intente de nuevo mas tarde'
          },
          REMOVE_PROFILE: {
            title: 'No se pudo cerrar su perfil.',
            description: 'Intente de nuevo mas tarde'
          }
        }
      },
      progress: {
        es: {
          UPDATE_AVATAR: 'Subiendo imagen'
        },
        en: {
          UPDATE_AVATAR: 'Uploading image'
        }
      }
    });
}());
