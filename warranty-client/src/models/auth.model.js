/**
 * Created by Osito on 08/08/2016.
 */


export class AuthModel{
    constructor(authData){
        this.authData = authData;
        this.authenticated = false;
        this.checkAuthentication();
    }
    
    checkAuthentication(){
        let token = window.localStorage.getItem('TOKEN');
        if (token){
            this.authData.authenticate(token).success((response) => {
                this.authenticated = response.authenticated;
            })
        }
    }
    
    login(email, password){
        this.authData.login({email, password})
            .success((response) => {
                window.localStorage.setItem("TOKEN", response);
                this.authenticated = true;
            });
    }
    
    register(email, password){
        this.authData.register({email, password})
            .success((response) => {
                this.login(email, password);
            })
    }

    isAuthencticated(){

    }
}