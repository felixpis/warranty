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

    products.addImage = function(productId, name, fileBytes, contentType, next){
        var image = {
            productId: productId,
            name: name,
            fileBytes: fileBytes,
            contentType: contentType
        };
        dataImages.save(image, next);
    };

    products.loadImage = function(productId, fileName, next){
        dataImages.get(productId, fileName, next);
    };

    products.removeImage = function(productId, fileName, next) {
        dataImages.remove(productId, fileName, next);
    }

})(module.exports);
