/**
 * Created by felixp on 10/03/2016.
 */

import {ProductsDataProvider} from './products.data';

export default angular.module('dataModule', [])
    .service('productsData', ProductsDataProvider);