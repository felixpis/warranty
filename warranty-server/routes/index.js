

(function (routes) {

  var products = require('./products');
  var auth = require('./auth');
  var authService = require('../services/auth');
  
  routes.exports = function(app){
    app.use('/products', authService.authenticateMidleware, products);
    app.use('/auth', auth);
  }

})(module);