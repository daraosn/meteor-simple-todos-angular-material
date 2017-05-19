/* eslint-env mocha */
/* global window inject */

import 'angular-mocks';
import { assert } from 'meteor/practicalmeteor:chai';

import '/client/lib/angular/app';
import login from './login';

describe('login', function() {
  var element;

  beforeEach(function() {
    var $compile;
    var $rootScope;

    window.module(login.name);

    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });

    element = $compile('<login/>')($rootScope.$new(true));
    $rootScope.$digest();
  });

  describe('component', function() {
    it('should contain md-login-form', function() {
      assert(!!element[0].querySelector('md-login-forms'));
    });
  });
});
