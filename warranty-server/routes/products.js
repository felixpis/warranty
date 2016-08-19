/**
 * Created by felixp on 30/11/2015.
 */

var express            = require('express');
var productsModel      = require('../models/products');
var multer             = require('multer');
var uploadMiddleware   = multer().any();
var authService        = require('../services/auth');
var mailService        = require('../services/mailer');

var router = express.Router();

router.get('/', authService.authApiMidleware, function (req, res) {
    productsModel.get(req.user._id, function (err, list) {
        res.json(list);
    })
});

router.put('/', authService.authApiMidleware, function (req, res) {
    productsModel.add(req.user._id, req.body.product, function (err, product) {
        res.json(product);
    })
});

router.post('/', authService.authApiMidleware, function (req, res) {
    productsModel.update(req.user._id, req.body.product, function (err, productId) {
        res.json(productId);
    })
});

router.post('/sendMail', authService.authApiMidleware, function (req, res) {
    productsModel.getOne(req.user._id, req.body.productId, function (err, product) {
        var attachments = [];
        if (product.imageFiles){
            attachments = product.imageFiles.map(function (image) {
                return {
                    filename: image.name,
                    content: image.fileBytes.buffer
                }
            })
        }
        mailService.sendMail(req.user.email, product.name, "", attachments, function (error, info) {
            if (error){
                return res.status(500).json(error);
            }

            res.json(info);
        });
    })
});

router.delete('/:productId', authService.authApiMidleware, function (req, res) {
    productsModel.remove(req.user._id, req.params.productId, function (err, deletedCount) {
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
