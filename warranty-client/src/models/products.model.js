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
            product.expirationType = function () {
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
            };
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
                }
            });
    }

    remove(productId){
        return this.productsData.remove(productId)
            .then((deleted) => {
                if (deleted) {
                    this.get();
                }
            });
    }
    
    get uploadUrl(){
        return this.productsData.uploadUrl;
    }
    
    get imageUrl(){
        return this.productsData.imageUrl;
    }
}