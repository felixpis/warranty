/**
 * Created by Osito on 08/08/2016.
 */

import loginViewTemplate from './login-view.html';
import './login-view.css';
    
class LoginViewController {
    /*@ngInject*/
    constructor(authModel) {
        this.authModel = authModel;
    }

    login(){
        this.authModel.login(this.email, this.password);
    }
}

export var LoginViewComponent = {
    controller: LoginViewController,
    templateUrl: loginViewTemplate
};