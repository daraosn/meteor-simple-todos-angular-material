import angular from 'angular';

import templateUrl from './about.html';

class AboutCtrl {
  constructor($scope) {
    'ngInject';

    $scope.viewModel(this);
    this.helpers({
      title: () => 'About',
    });
  }
}

export default angular.module('app')
.component('about', { controller: AboutCtrl, templateUrl });
