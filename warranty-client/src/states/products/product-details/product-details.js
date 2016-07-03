/**
 * Created by felixp on 10/03/2016.
 */

import './product-details.css';
import detailsTemplate from './product-details.html';

class ProductDetailsController {
    /*@ngInject*/
    constructor(modalsService) {
        this.modalsService = modalsService;
        this._selected = null;
        this.productToEdit = {};
        this.flowObj = {};
    }

    get selectedProduct(){
        return this._selected;
    }

    set selectedProduct(value){
        if (value) {
            this._selected = value;
            this.productToEdit = angular.copy(value);
            this.productToEdit.purchaseDate = new Date(this.productToEdit.purchaseDate);
            if (this.flowObj) {
                this.flowObj.flow.opts.target = `${this.uploadUrl}${value._id}`;
                console.log(this.flowObj.flow.opts.target);

            }
        }
    }

    removeProduct() {
        this.modalsService.confirm('Do you want to remove product?')
            .then((result) => {
                this.remove();
                this.productToEdit = {};
            });
    };

    openFile(fileName){
        window.open(this.getProductImage(fileName));
    }
    
    getProductImage(fileName){
        return `${this.imageUrl}${this.productToEdit._id}/${fileName}`
    }

    uploadCompleted(message){
        let result = JSON.parse(message);
        if(!this._selected.images){
            this._selected.images = [];
        }
        if(!this.productToEdit.images) {
            this.productToEdit.images = [];
        }
        this._selected.images.push(result.fileName);
        this.productToEdit.images.push(result.fileName);
    }
}

export var ProductDetailsComponent = {
    bindings: {
        selectedProduct: '=',
        remove: '&',
        save: '&',
        uploadUrl: '=',
        imageUrl: '='
    },
    controller: ProductDetailsController,
    templateUrl: detailsTemplate
};