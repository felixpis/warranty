/**
 * Created by felixp on 10/03/2016.
 */


export class ProductsController{
    /*@ngInject*/
    constructor(productsModel){
        this.productsModel = productsModel;
        this.selectedProduct = null;
        this.detailsOptions = {};

        this.productsList = this.productsModel.products;
        this.uploadUrl =productsModel.uploadUrl;
        this.imageUrl = productsModel.imageUrl;
        this.loadProducts();
    }

    loadProducts(){
        this.productsModel.get()
            .then(() => {
                /*if (this.productsList.length > 0) {
                    this.selectedProduct = this.productsList[0];
                }*/
            })
    }

    addProduct(name, period){
        this.productsModel.add({name, period})
            .then(() => {
                this.selectedProduct = this.productsList[0];
            })
    }

    updateProduct(product){
        this.productsModel.update(product);
    }

    deleteProduct(){
        this.productsModel.remove(this.selectedProduct._id)
            .then(() => {
                this.selectedProduct = null;
            });
    }

    selectProduct(product){
        this.selectedProduct = product;
        if (this.detailsOptions.cancelEdit) {
            this.detailsOptions.cancelEdit();
        }
    }

    sendMail(){
        return this.productsModel.sendMail(this.selectedProduct._id);
    }
}