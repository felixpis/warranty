/**
 * Created by felixp on 10/03/2016.
 */


import detailsTemplate from './product-details.html';

class ProductDetailsController {
    constructor(modalsService) {
        this.modalsService = modalsService;
        this._selected = null;
        this.productToEdit = {};
    }

    get selected(){
        return this._selected;
    }

    set selected(value){
        if (value) {
            this._selected = value;
            this.productToEdit = angular.copy(value);
            this.productToEdit.purchaseDate = new Date(this.productToEdit.purchaseDate);
        }
    }

    removeProduct() {
        this.modalsService.confirm('Do you want to remove product?')
            .then((result) => {
                this.remove();
                this.productToEdit = {};
            });
    };
}

export var ProductDetailsComponent = {
    bindings: {
        selected: '=',
        remove: '&',
        save: '&'
    },
    controller: ProductDetailsController,
    template: detailsTemplate
};