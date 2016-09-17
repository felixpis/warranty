/**
 * Created by Osito on 06/06/2016.
 */


(function (auth) {

    var jwt = require('jsonwebtoken');
    var config = require('../config.json').auth;
    var usersModel = require('../models/users');
    
    auth.login = function (name, password, next) {
        
        usersModel.get(name, function (err, user) {
            if (err){
                return next(err, null)
            }

            if (user.password != password){
                return next({message: "Password is wrong"}, null);
            }

            delete user.password;
            var token = jwt.sign(user, config.secret, {expiresIn: '30 days'});
            next(null, token);
        });
    };
    
    auth.authenticate = function (token, next) {
        jwt.verify(token, config.secret, function (err, decoded) {
            next(decoded);
        });
    };
    
    auth.authenticateMidleware = function (req, res, next) {
        var token = req.headers["x-access-token"];
        console.log('token: ' + token);
        if (token) {
            auth.authenticate(token, function (user) {
                req.user = user;
                next();
            });
        }
        else {
            next();
        }
    };
    
    auth.authApiMidleware = function (req, res, next) {
        if (req.user || req.method == 'OPTIONS'){
            next();
        }
        else{
            res.status(403).send({message: "Not authenticated"});
        }
    };
    
})(module.exports);