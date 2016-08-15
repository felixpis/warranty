/**
 * Created by felixp on 10/01/2016.
 */

(function (products) {

    var database = require('./database');

    products.get = function (userId, next) {
        database.getDB(function(err, db){
            db.products.find({userId : userId}).toArray(function(err, products){
                next(err, products);
            })
        })
    };

    products.add = function(product, next) {
        database.getDB(function(err, db){
            db.products.insertOne(product, function(err, r){
                product._id = r.insertedId;
                next(err, product);
            })
        })
    };

    products.update = function(product, next) {
        database.getDB(function(err, db){
            var key = new db.objectId(product._id);
            delete product._id;
            db.products.updateOne({_id: key, userId : product.userId}, product, function(err, r){
                next(err, r.nModified);
            })
        })
    };

    products.remove = function(userId, productId, next) {
        database.getDB(function(err, db){
            db.products.removeOne({_id: new db.objectId(productId), userId: userId}, function(err, r){
                next(err, r.deletedCount);
            })
        })
    };

    products.setImageName = function (productId, name) {
        database.getDB(function (err, db) {
            db.products.updateOne({_id: new db.objectId(productId)}, {$addToSet: {images: name}});
        })
    };

    products.removeImageName = function (productId, name) {

    }


})(module.exports);
