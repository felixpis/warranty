/**
 * Created by felixp on 18/11/2015.
 */

export class MainController{
    /*@ngInject*/
    constructor(authModel){
        this.authModel = authModel;
    }

    get authenticated(){
        return this.authModel.authenticated;
    }
    
    logout(){
        this.authModel.logout();
    }
}
