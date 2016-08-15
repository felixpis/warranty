/**
 * Created by Osito on 06/06/2016.
 */


(function (users) {
    var database = require('./database');

    users.get = function (email, next) {
        database.getDB(function(err, db){
            db.users.findOne({email: email}, next);
        })
    };

    users.add = function (user, next) {
        database.getDB(function(err, db){
            db.users.findOne({email: user.email}, function (err, result) {
                if (result){
                    next({message: "User name already exists"}, null);
                }
                else{
                    db.users.insertOne(user, function (err, r) {
                        if (err){
                            next(err, null);
                        }
                        else{
                            next(null, r.insertedId);
                        }
                    });
                }
            });
        })
    };

    users.remove = function (name, next) {
        database.getDB(function(err, db){
            db.users.remove({name: name}, next);
        })
    };


})(module.exports);