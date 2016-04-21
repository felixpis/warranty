/**
 * Created by felixp on 10/03/2016.
 */

export class ProductsDataProvider{
    constructor($http, CONFIG){
        this.$http = $http;
        this.url = CONFIG.serverUrl + 'products/';
    }

    get(){
        return this.$http.get(this.url)
            .then((response) => {
                return response.data;
            });
    }

    add(product) {
        return this.$http.put(this.url, {product})
            .then((response) => {
                return response.data;
            });
    }

    update(product) {
        return this.$http.post(this.url, {product})
            .then((response) => {
                return response.data > 0;
            });
    }

    remove(productId){
        return this.$http.delete(this.url + productId)
            .then((response) => {
                return response.data > 0;
            });
    }
}