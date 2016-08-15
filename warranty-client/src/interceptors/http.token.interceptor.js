/**
 * Created by Osito on 10/08/2016.
 */

export function httpTokenInterceptor() {
    return {
        request: function (config) {
            let token = window.localStorage.getItem('TOKEN');
            if (token){
                config.headers["x-access-token"] = token;
            }
            return config;
        }
    }
}