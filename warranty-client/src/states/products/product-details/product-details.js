/**
 * Created by felixp on 10/03/2016.
 */

import './product-details.css';
import detailsTemplate from './product-details.html';

class ProductDetailsController {
    /*@ngInject*/
    constructor(modalsService) {
        this.modalsService = modalsService;
        this.inProgress = false;
        this.productToEdit = null;
        if (this.options){
            this.options.cancelEdit = () => {
                this.cancelEdit();
            }
        }
    }

    getUploadUrl(){
        return this.uploadUrl;
    }

    saveProduct(){
        this.save({product: this.productToEdit});
        this.productToEdit = null;
    }

    editProduct(){
        this.productToEdit = angular.copy(this.selectedProduct);
        this.productToEdit.purchaseDate = new Date(this.productToEdit.purchaseDate);
    }

    cancelEdit(){
        this.productToEdit = null;
    }

    removeProduct() {
        this.modalsService.confirm('Do you want to remove product?')
            .then((result) => {
                this.remove();
                this.productToEdit = {};
            });
    };

    openFile(image){
        window.open(this.getProductImage(image));
    }
    
    getProductImage(image){
        return `${this.imageUrl}${image.imageId}/${image.fileName}`;
    }

    removeImage($index){
        this.productToEdit.images.splice($index, 1);
    }

    uploadCompleted(message){
        let result = JSON.parse(message);
        if(!this.productToEdit.images) {
            this.productToEdit.images = [];
        }
        this.productToEdit.images.push(result);
    };

    uploadStarted($flow) {
        this.inProgress = true;
        $flow.upload();
    };

    uploadEnded() {
        this.inProgress = false;
    }
}

export var ProductDetailsComponent = {
    bindings: {
        options: '=',
        selectedProduct: '=',
        remove: '&',
        save: '&',
        uploadUrl: '=',
        imageUrl: '='
    },
    controller: ProductDetailsController,
    templateUrl: detailsTemplate
};