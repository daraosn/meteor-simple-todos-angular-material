/* eslint-env mocha */
/* global window inject */

import 'angular-mocks';
import { assert } from 'meteor/practicalmeteor:chai';

import '/client/lib/angular/app';
import about from './about';

describe('about', function() {
  var element;

  beforeEach(function() {
    var $compile;
    var $rootScope;

    window.module(about.name);

    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });

    element = $compile('<about/>')($rootScope.$new(true));
    $rootScope.$digest();
  });

  describe('component', function() {
    it('should be displaying about text on header', function() {
      assert.include(element[0].querySelector('h3').innerHTML, 'About');
    });
  });
});
