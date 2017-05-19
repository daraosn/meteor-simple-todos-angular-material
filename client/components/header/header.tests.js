/* eslint-env mocha */
/* global window inject */

import 'angular-mocks';
import { assert } from 'meteor/practicalmeteor:chai';

import '/client/lib/angular/app';
import header from './header';

describe('header', function() {
  var element;

  beforeEach(function() {
    var $compile;
    var $rootScope;

    window.module(header.name);

    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });

    element = $compile('<header/>')($rootScope.$new(true));
    $rootScope.$digest();
  });

  describe('component', function() {
    it('should display logo', function() {
      assert.include(element[0].querySelector('.logo').innerHTML, 'Meteor Angular Material Todos');
    });

    it('should display login menu', function() {
      assert(!!element[0].querySelector('md-login-buttons'));
    });
  });
});
