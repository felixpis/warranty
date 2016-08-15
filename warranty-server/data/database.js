/**
 * Created by felixp on 10/01/2016.
 */

(function(database){

    var mongo = require('mongodb');
    var mongoClient = mongo.MongoClient;
    var Grid = require('gridfs-stream');

    var objectId = mongo.ObjectID;
    var config = require('../config.json');

    var url = config.database.url;

    var theDB = null;
    database.getDB = function (next) {

        if (theDB) {
            next(null, theDB);
        }
        else {
            mongoClient.connect(url, function (err, db) {
                if (err) {
                    console.log('Failed to connect to server');
                    console.log(err);
                    return next(err);
                }
                console.log("Connected correctly to server.");
                var gfs = new Grid(db, mongo);
                theDB = {
                    db      : db,
                    gfs     : gfs,
                    objectId: objectId,
                    products: db.collection('products'),
                    images  : db.collection('images'),
                    users: db.collection('users')
                };
                next(null, theDB);
                //db.close();
            });
        }

    }

})(module.exports);