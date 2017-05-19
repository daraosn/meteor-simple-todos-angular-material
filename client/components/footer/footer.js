import angular from 'angular';

import templateUrl from './footer.html';

class FooterCtrl {
  constructor($scope) {
    'ngInject';

    $scope.viewModel(this);
    this.helpers({
      year: () => new Date().getFullYear()
    });
  }
}

export default angular.module('app')
.component('footer', { controller: FooterCtrl, templateUrl });
