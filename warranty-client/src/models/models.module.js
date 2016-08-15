/**
 * Created by felixp on 10/03/2016.
 */

import {ProductsModel} from './products.model';
import {AuthModel} from './auth.model';

export default angular.module('modelsModule', [])
    .service('productsModel', ProductsModel)
    .service('authModel', AuthModel);