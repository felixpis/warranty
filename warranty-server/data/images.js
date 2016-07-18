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

    images.get = function(imageId, next){
        database.getDB(function(err, db){
            //productId, name, fileBytes, contentType
            db.images.findOne({_id: new db.objectId(imageId)}, function(err, image){
                next(err, image);
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