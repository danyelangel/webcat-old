(function () {
  'use strict';

  angular
    .module('webcat')
    .value('$routerRootComponent', 'rootEl')
    .component('rootEl', {
      template: '<ng-outlet></ng-outlet>',
      $routeConfig: [
        // Public
        {
          path: '/',
          name: 'Landing',
          component: 'landingEl',
          useAsDefault: true
        },
        {
          path: '/user/:userId',
          name: 'UserProfile',
          component: 'profileEl'
        },
        {
          path: '/r/:docId',
          name: 'WebcatRender',
          component: 'wcRender'
        },
        // Private
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: 'dashboardEl'
        },
        {
          path: '/edit/:taoId',
          name: 'WebcatEditor',
          component: 'wcEditor'
        }
      ]
    });
}());
