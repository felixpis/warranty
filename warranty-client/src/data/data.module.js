/**
 * Created by felixp on 10/03/2016.
 */

import {ProductsDataProvider} from './products.data';
import {AuthDataProvider} from './auth.data';

export default angular.module('dataModule', [])
    .service('productsData', ProductsDataProvider)
    .service('authData', AuthDataProvider);