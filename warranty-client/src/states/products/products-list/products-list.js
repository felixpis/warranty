/**
 * Created by felixp on 10/03/2016.
 */

import './products-list.css';
import listTemplate from './products-list.html';

class ProductsListController {
    /*@ngInject*/
    constructor(modalsService) {
        this.modalsService = modalsService;
    }

    addProduct() {
        this.modalsService.prompt('', 'Add product')
            .then((productName) => {
                this.add({name: productName});
            });
    };

    expirationClass(product) {
        return {
            'expired-icon' : product.expirationType() == 2,
            'going-to-expire-icon' : product.expirationType() == 1,
            'ok-icon' : product.expirationType() == 0
        };
    }
}

export var ProductsListComponent = {
    bindings: {
        selectedProduct: '=',
        list: '=',
        select: '&',
        add: '&'
    },
    controller: ProductsListController,
    templateUrl: listTemplate
};