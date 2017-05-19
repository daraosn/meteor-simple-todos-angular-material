/* eslint-env mocha */
/* global window inject */

import 'angular-mocks';
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';

import '/client/lib/angular/app';
import auth from './auth';

describe('auth', function() {
  var Auth;

  beforeEach(function() {
    window.module(auth.name);

    inject(function(_Auth_) {
      Auth = _Auth_;
    });
  });

  describe('service', function() {
    describe('.state()', function() {
      var userStub;

      beforeEach(() => {
        userStub = sinon.stub(Meteor, 'user');
      });

      afterEach(() => {
        Meteor.user.restore();
      });

      describe('logged out', function() {
        beforeEach(function() {
          userStub.returns(null);
        });

        it('should not authorize', function() {
          assert(Auth.state('auth.dashboard')._identifier === 'login');
        });
      });

      describe('logged in', function() {
        beforeEach(function() {
          // Angular loads before Meteor user
          userStub.onCall(0).returns(null);
          // When user state changes, Auth.state is triggered again
          userStub.returns({});
        });

        it('should authorize on second call and define redirect', function() {
          assert(Auth.state('auth.dashboard')._identifier === 'login');
          assert(Auth.$rootScope.loginRedirect === 'auth.dashboard');
          assert(Auth.state('auth.dashboard') === undefined);
        });
      });
    });

    describe('.onSignup()', function() {
      it('should redirect to dashboard by default', function() {
        sinon.stub(Auth.$state, 'go');
        Auth.onSignup();
        assert(Auth.$state.go.calledWith('auth.dashboard'));
      });
    });

    describe('.onLogin()', function() {
      describe('autologin', function() {
        it('should not redirect if `autologin`', function() {
          sinon.stub(Auth.$state, 'go');
          assert(!Auth.$rootScope.loggedIn);
          assert(Auth.$rootScope.loginRedirect === undefined);
          Auth.onLogin(true);
          assert(Auth.$rootScope.loggedIn);
          assert(!Auth.$state.go.called);
        });
      });

      describe('not autologin', function() {
        it('should redirect to `dashboard` by default', function() {
          sinon.stub(Auth.$state, 'go');
          Auth.onLogin();
          assert(Auth.$state.go.calledWith('auth.dashboard'));
        });

        it('should redirect to `$rootScope.loginRedirect`', function() {
          sinon.stub(Auth.$state, 'go');
          assert(Auth.state('auth.private')._identifier === 'login');
          Auth.onLogin();
          assert(Auth.$state.go.calledWith('auth.private'));
        });
      });
    });

    describe('.onLogout()', function() {
      it('should reset $rootScope and go to `login` state', function() {
        sinon.stub(Auth.$state, 'go');
        Auth.$rootScope.loggedIn = true;
        Auth.$rootScope.loginRedirect = 'foo';
        Auth.onLogout();
        assert(!Auth.$rootScope.loggedIn);
        assert(Auth.$rootScope.loginRedirect === undefined);
        assert(Auth.$state.go.calledWith('login'));
      });
    });
  });
});
