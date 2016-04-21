/**
 * Created by felixp on 18/01/2016.
 */

(function(images){

    var database = require('./database');

    images.save = function(file, next){
        database.getDB(function(err, db){
            db.images.insertOne(file, function(err, r){
                next(err, r.insertedId);
            });
        })
    };

    images.get = function(productId, fileName, next){
        database.getDB(function(err, db){
            //productId, name, fileBytes, contentType
            console.log(productId);
            console.log(fileName);
            db.images.find({productId: productId, name: fileName}).toArray(function(err, images){
                if (images.length > 0) {
                    next(null, images[0]);
                }
                else{
                    next(err, null);
                }

            })
        })
    };

    images.remove = function(productId, fileName, next) {
        database.getDB(function(err, db){
            var query = {productId: productId};
            if (fileName) {
                query.name = fileName;
            }
            db.products.remove(query, function(err, r){
                next(err, r.deletedCount);
            })
        })
    };

})(module.exports);