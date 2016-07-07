/**
 * Created by felixp on 10/03/2016.
 */

import productsTemplate from './products/products.html';

import productsModule from './products/products.module';

let dependencies = [
    'ui.router',

    productsModule.name
];

export default angular.module('statesModule', dependencies)
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('products', {
                url: "/",
                templateUrl: productsTemplate,
                controller: 'ProductsController',
                controllerAs: 'products'
            });
    });