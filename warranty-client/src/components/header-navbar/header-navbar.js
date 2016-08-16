/**
 * Created by Osito on 16/08/2016.
 */

import './header-navbar.css';
import headerNavbarTemplate from './header-navbar.html';
import loginViewContainer from '../login-view/login-view-container.html';
import registerViewContainer from '../register-view/register-view-container.html';

class HeaderNavbarController{
    constructor(){
        this.loginViewContainer = loginViewContainer;
        this.registerViewContainer = registerViewContainer;
    }
}

export var HeaderNavbarComponent = {
    controller: HeaderNavbarController,
    templateUrl: headerNavbarTemplate,
    bindings: {
        authenticated: '=',
        logout: '&'
    }
};