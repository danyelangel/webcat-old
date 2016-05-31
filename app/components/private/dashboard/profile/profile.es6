(function () {
  'use strict';
  class Controller {
    constructor(UserState, UserActions) {
      this.state = UserState;
      this.actions = UserActions;
      this.placeholder = 'https://www.rit.edu/science/sites/rit.edu.science/files/root/man-placeholder_27.jpg';
      this.wysiwygOptions = {
        toolbar: {
          buttons: ['bold', 'italic']
        }
      };
    }
    update() {
      if (angular.isObject(this.state)) {
        this.actions
          .updateProfile(this.state.userProfile);
      }
    }
    uploadImage(file) {
      if (file) {
        this.actions.updateAvatar(file);
      }
    }
  }
  angular
    .module('dashboard')
    .component('dashboardProfile', {
      templateUrl: 'components/private/dashboard/profile/profile.html',
      controller: Controller
    });
}());
