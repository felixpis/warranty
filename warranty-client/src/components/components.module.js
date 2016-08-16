/**
 * Created by Osito on 08/08/2016.
 */


import {LoginViewComponent} from './login-view/login-view';
import {RegisterViewComponent} from './register-view/register-view';
import {HeaderNavbarComponent} from './header-navbar/header-navbar';

export default angular.module('componentsModule', [])
    .component('loginView', LoginViewComponent)
    .component('registerView', RegisterViewComponent)
    .component('headerNavbar', HeaderNavbarComponent);