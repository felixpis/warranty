/**
 * Created by felixp on 30/11/2015.
 */

var express            = require('express');
var productsModel      = require('../models/products');
var multer             = require('multer');
var uploadMiddleware   = multer().any();

var router = express.Router();

router.get('/', function (req, res) {
    productsModel.get(function (err, list) {
        res.json(list);
    })
});

router.put('/', function (req, res) {
    productsModel.add(req.body.product, function (err, product) {
        res.json(product);
    })
});

router.post('/', function (req, res) {
    productsModel.update(req.body.product, function (err, productId) {
        res.json(productId);
    })
});

router.delete('/:productId', function (req, res) {
    productsModel.remove(req.params.productId, function (err, deletedCount) {
        res.json(deletedCount);
    })
});

router.get('/images/upload', function (req, res) {
    res.status(204).send();
});

router.post('/images/upload', uploadMiddleware, function (req, res) {
    productsModel.addImage(req.body.flowFilename, req.files[0].buffer,
        function(err, imageId) {
            res.status(200).send({imageId: imageId, fileName: req.body.flowFilename});
        });
});

router.get('/images/load/:imageId/:fileName', function (req, res) {
    productsModel.loadImage(req.params.imageId, function (err, image) {
        res.header("Content-Type", "image/jpg");
        if (image) {
            res.status(200).send(image);
        }
        else {
            res.status(404).send();
        }

    });
});


module.exports = router;
