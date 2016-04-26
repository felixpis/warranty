/**
 * Created by felixp on 30/11/2015.
 */

var express            = require('express');
var multiparty         = require('connect-multiparty');
var multipartMidleware = multiparty();
var busboyBodyParser   = require('busboy-body-parser');
var busboxMiddleware   = busboyBodyParser({limit: '5mb'});
var flow               = require('../models/flow-node.js')('tmp');
var fs                 = require('fs');
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

router.get('/image/upload/:productId', function (req, res) {

    res.status(204).send();

    /*flow.get(req, function (status, filename, original_filename, identifier) {
        console.log('GET', status);
        if (status == 'found') {
            status = 200;
        } else {
            status = 204;
        }

        res.status(status).send();
    });*/
});

router.post('/image/upload/:productId', uploadMiddleware, function (req, res) {

    console.log('we are here: ' + req.params.productId);
    console.log(req.body);
    console.log(req.files);
    productsModel.addImage(req.params.productId, req.body.flowFilename, req.files[0].buffer, req.files[0].mimetype, function(err, imageId){
        res.status(200).send({imageId: imageId, fileName: req.body.flowFilename});
    });
});

router.get('/image/load/:productId/:fileName', function (req, res) {
    productsModel.loadImage(req.params.productId, req.params.fileName, function (err, image) {
        res.header("Content-Type", "image/jpg");
        if (image) {
            res.status(200).send(image.fileBytes.buffer);
        }
        else {
            res.status(404).send();
        }

    });

    //flow.write(req.params.productId, res);
});


module.exports = router;
