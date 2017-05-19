/* eslint-env mocha */
/* global window inject */

import 'angular-mocks';
import { assert } from 'meteor/practicalmeteor:chai';

import '/client/lib/angular/app';
import todosList from './dashboard';

describe('dashboard', function() {
  var element;

  beforeEach(function() {
    var $compile;
    var $rootScope;

    window.module(todosList.name);

    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });

    element = $compile('<dashboard/>')($rootScope.$new(true));
    $rootScope.$digest();
  });

  describe('component', function() {
    it('should be container header title', function() {
      assert.include(element[0].querySelector('h2').innerHTML, 'Dashboard');
    });
  });
});
