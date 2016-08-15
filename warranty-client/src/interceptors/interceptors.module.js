/**
 * Created by Osito on 10/08/2016.
 */

import {httpTokenInterceptor} from './http.token.interceptor';

export default angular.module('interceptorsModule', [])
    .config(($httpProvider) => {
        $httpProvider.interceptors.push(httpTokenInterceptor);
    });