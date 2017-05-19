import angular from 'angular';

import templateUrl from './login.html';

class LoginCtrl {
  constructor() {
    'ngInject';
  }
}

export default angular.module('app')
.component('login', { controller: LoginCtrl, templateUrl });
