/**
 * Created by Osito on 08/08/2016.
 */

var express = require('express');
var usersModel = require('../models/users');
var authService = require('../services/auth');

var router = express.Router();

router.post('/login', function (req, res) {
    authService.login(req.body.email, req.body.password, function (err, result) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.send(result);
        }
    });
});

router.post('/registration', function (req, res) {
    usersModel.add(req.body.email, req.body.password, function (err, user) {
        if (user){
            res.json(user);
        }
        else{
            res.json(err);
        }
    })
});

router.post('/authenticate', function (req, res) {
    authService.authenticate(req.body.token, function (user) {
        if (user){
            res.json({authenticated: true});
        }
        else{
            res.json({authenticated: false});
        }
    })
});

module.exports = router;
