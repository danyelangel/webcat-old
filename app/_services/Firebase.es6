(function () {
  'use strict';
  class Service {
    constructor($window) {
      let config = {
        apiKey: 'AIzaSyBme1VlJM5vjscQGkbL0xiKnEdL0hOxMA0',
        authDomain: 'webcat.firebaseapp.com',
        databaseURL: 'https://webcat.firebaseio.com',
        storageBucket: 'project-867618968114337534.appspot.com'
      };
      $window.firebase.initializeApp(config);
      this.firebase = $window.firebase;
    }
  }
  angular
    .module('tao')
    .service('Firebase', Service);
}());
