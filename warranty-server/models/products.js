/**
 * Created by felixp on 30/11/2015.
 */

(function (products) {

    var data = require('../data/products');
    var dataImages = require('../data/images');

    products.get = function (next) {
        data.get(next);
    };

    products.add = function(product, next) {
        product.purchaseDate = new Date();
        data.add(product, next);
    };

    products.update = function(product, next) {
        data.update(product, next);
    };

    products.remove = function(productId, next) {
        data.remove(productId, next);
        dataImages.remove(productId, null, function(err, deletedCount){
            console.log("deleted image: ", deletedCount);
        })
    };

    products.addImage = function(name, fileBytes, next){
        var image = {
            name: name,
            fileBytes: fileBytes
        };
        dataImages.save(image, function(err, imageId){
            next(err, imageId);
        });
    };

    products.loadImage = function(imageId, next){
        dataImages.get(imageId, function (err, image) {
            if (image){
                next(null, image.fileBytes.buffer)
            }
            else{
                next(err, null);
            }
        });
    };

    products.removeImage = function(productId, fileName, next) {
        dataImages.remove(productId, fileName, next);
    }

})(module.exports);
