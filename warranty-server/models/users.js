/**
 * Created by Osito on 06/06/2016.
 */


(function (users) {

    var data = require('../data/users');

    function UsersModel(user) {
        return {
            email: user.email,
            password: user.password
        }
    }

    users.add = function (email, password, next) {
        var user = UsersModel({email: email, password: password});
        data.add(user, next);
    };
    
    users.get = function (email, next) {
        data.get(email, function (err, user) {
            if (!user){
                return next({message: "User not found"}, null);
            }

            next (null, user);
        })
    };

})(module.exports);