/**
 * Created by felixp on 10/03/2016.
 */

export class ProductsModel{
    constructor(productsData) {
        this.productsData = productsData;
        this.products = [];
    }

    get(){
        return this.productsData.get()
            .then((products) => {
                angular.copy(products, this.products);
            })
    }

    add(product) {
        return this.productsData.add(product)
            .then((newProduct) => {
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
}