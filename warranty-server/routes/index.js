

(function (routes) {

  var products = require('./products');

  routes.exports = function(app){
    app.use('/products', products);
  }

})(module);