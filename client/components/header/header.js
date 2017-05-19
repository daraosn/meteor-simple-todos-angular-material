import angular from 'angular';

import templateUrl from './header.html';

class HeaderCtrl {
  constructor($scope) {
    'ngInject';

    $scope.viewModel(this);
    this.helpers({

    });
  }
}

export default angular.module('app')
.component('header', { controller: HeaderCtrl, templateUrl });
