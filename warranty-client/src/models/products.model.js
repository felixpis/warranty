/**
 * Created by felixp on 10/03/2016.
 */

export class ProductsModel{
    /*@ngInject*/
    constructor(productsData) {
        this.productsData = productsData;
        this.products = [];
    }

    get(){
        return this.productsData.get()
            .then((products) => {
                this.transformProducts(products);
                angular.copy(products, this.products);
            })
    }

    transformProducts(products){
        for(let product of products){
            angular.extend(product, {
                get expirationDays() {
                    let date = new Date();
                    let expDate = new Date(product.purchaseDate);
                    expDate.setYear(expDate.getFullYear() + product.period);
                    var ONE_DAY = 1000 * 60 * 60 * 24;
                    var date1_ms = date.getTime();
                    var date2_ms = expDate.getTime();

                    // Calculate the difference in milliseconds
                    var difference_ms = date2_ms - date1_ms;

                    // Convert back to days and return
                    return Math.round(difference_ms/ONE_DAY);
                },
                get expirationDate(){
                    let date = new Date(product.purchaseDate);
                    date.setYear(date.getFullYear() + product.period);
                    return date;
                },
                get expirationType(){
                    let days = product.expirationDays;
                    console.log(days);
                    if (days < 0) {
                        return 2;
                    }
                    if (days < 14) {
                        return 1;
                    }
                    return 0;
                }
            });
            /*product.expirationType = function () {
                let date = new Date(this.purchaseDate);
                date.setYear(date.getFullYear() + this.period);
                let dateNow = new Date();
                if (date < dateNow) {
                    return 2;
                }
                dateNow.setDate(dateNow.getDate() + 14);
                if (date < dateNow) {
                    return 1;
                }
                return 0;
            };*/
        }
    }

    add(product) {
        return this.productsData.add(product)
            .then((newProduct) => {
                this.transformProducts([newProduct]);
                this.products.unshift(newProduct);
            });
    }

    update(product) {
        return this.productsData.update(product)
            .then((updated) => {
                let foundProduct = this.products.find(p => {
                    return p._id == product._id;
                });

                if (foundProduct) {
                    angular.copy(product, foundProduct);
                    this.transformProducts([foundProduct]);
                }
            });
    }

    remove(productId){
        return this.productsData.remove(productId)
            .then((deleted) => {
                if (deleted) {
                    this.get();
                }
                return true;
            });
    }
    
    get uploadUrl(){
        return this.productsData.uploadUrl;
    }
    
    get imageUrl(){
        return this.productsData.imageUrl;
    }
    
    sendMail(productId){
        return this.productsData.sendMail(productId);
    }
}