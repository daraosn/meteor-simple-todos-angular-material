import angular from 'angular';
import { Meteor } from 'meteor/meteor';

class Auth {
  constructor($rootScope, $state) {
    'ngInject';

    this.$state = $state;
    this.$rootScope = $rootScope;

    this.autorunComputation = Meteor.autorun(() => {
      var currentUser = Meteor.user();
      if (!this.$rootScope.loggedIn && currentUser) this.onLogin(true);
    });
  }

  state(name) {
    if (!Meteor.user()) {
      this.$rootScope.loginRedirect = name;
      return this.$state.target('login');
    }
    this.$rootScope.$applyAsync();
  }

  onSignup() {
    this.$state.go('auth.dashboard');
    this.$rootScope.$applyAsync();
  }

  onLogin(autologin) {
    if (this.$rootScope.loggedIn) return;
    this.$rootScope.loggedIn = true;
    if (this.$rootScope.loginRedirect) {
      this.$state.go(this.$rootScope.loginRedirect);
    } else {
      if (!autologin) this.$state.go('auth.dashboard');
    }
    this.$rootScope.$applyAsync();
  }

  onLogout() {
    delete this.$rootScope.loginRedirect;
    this.$rootScope.loggedIn = false;
    this.$state.go('login');
    this.$rootScope.$applyAsync();
  }
}

export default angular.module('app')
.service('Auth', Auth);
