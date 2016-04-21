/**
 * Created by felixp on 10/03/2016.
 */

import {ProductsController} from './products.controller';
import {ProductsListComponent} from './products-list/products-list';
import {ProductDetailsComponent} from './product-details/product-details';

export default angular.module('productsModule', [])
    .controller('ProductsController', ProductsController)
    .component('productsList', ProductsListComponent)
    .component('productDetails', ProductDetailsComponent);