/**
 * Created by Osito on 08/08/2016.
 */


export class AuthDataProvider{
    /*@ngInject*/
    constructor($http, CONFIG){
        this.$http = $http;
        this.url = CONFIG.serverUrl + 'auth/';
    }

    login(loginData){
        return this.$http.post(this.url + 'login', loginData);
    }

    register(registrationData){
        return this.$http.post(this.url + 'registration', registrationData);
    }

    authenticate(token){
        return this.$http.post(this.url + 'authenticate', {token: token});
    }
}