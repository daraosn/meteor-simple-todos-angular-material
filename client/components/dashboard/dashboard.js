import angular from 'angular';

import templateUrl from './dashboard.html';

class DashboardCtrl {
  constructor($scope) {
    'ngInject';

    $scope.viewModel(this);

    this.helpers({

    });
  }
}

export default angular.module('app')
.component('dashboard', { controller: DashboardCtrl, templateUrl });
