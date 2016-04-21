/**
 * Created by felixp on 10/03/2016.
 */

import listTemplate from './products-list.html';

class ProductsListController {
    constructor(modalsService) {
        this.modalsService = modalsService;
    }

    addProduct() {
        this.modalsService.prompt('', 'Add product')
            .then((productName) => {
                this.add({name: productName});
            });
    };
}

export var ProductsListComponent = {
    bindings: {
        selected: '=',
        list: '=',
        select: '&',
        add: '&'
    },
    controller: ProductsListController,
    template: listTemplate
};