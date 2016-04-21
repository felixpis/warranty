/**
 * Created by felixp on 10/03/2016.
 */


export class ProductsController{
    constructor(productsModel){
        this.productsModel = productsModel;
        this.selectedProduct = {};
        this.productToEdit = {};

        this.productsList = this.productsModel.products;
        this.uploadUrl =productsModel.uploadUrl;
        this.loadProducts();
    }

    loadProducts(){
        this.productsModel.get()
            .then(() => {
                if (this.productsList.length > 0) {
                    this.selectedProduct = this.productsList[0];
                }
            })
    }

    addProduct(name){
        this.productsModel.add({name})
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
                this.selectedProduct = this.productsList[0];
            });
    }

    selectProduct(product){
        this.selectedProduct = product;
    }
}