/**
 * Created by Osito on 08/08/2016.
 */

import registerViewTemplate from './register-view.html';
import './register-view.css';
    
class RegisterViewController {
    constructor(authModel) {
        this.authModel = authModel;
    }
    
    register(){
        this.authModel.register(this.email, this.password);
    }
}

export var RegisterViewComponent = {
    controller: RegisterViewController,
    templateUrl: registerViewTemplate
};