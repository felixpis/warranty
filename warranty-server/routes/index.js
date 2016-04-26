

(function (routes) {

  var products = require('./products');
  //var expressThumbnail = require('express-thumbnail');

  routes.exports = function(app){
    app.use('/products', products);
    //app.use(expressThumbnail.register('/products/images/load'))
  }

})(module);