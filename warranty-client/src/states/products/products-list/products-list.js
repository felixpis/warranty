/**
 * Created by felixp on 10/03/2016.
 */

import './products-list.css';
import listTemplate from './products-list.html';

import {ProductCreateController} from '../product-create/product-create';
import productCreateTemplate from '../product-create/product-create.html';

class ProductsListController {
    /*@ngInject*/
    constructor($uibModal) {
        this.$uibModal = $uibModal;
    }

    addProduct() {
        this.$uibModal.open({
            templateUrl: productCreateTemplate,
            controller: ProductCreateController,
            controllerAs: '$ctrl'
        }).result.then((product) => {
            this.add(product);
        });
    };

    expirationClass(product) {
        return {
            'expired-icon' : product.expirationType == 2,
            'going-to-expire-icon' : product.expirationType == 1,
            'ok-icon' : product.expirationType == 0
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