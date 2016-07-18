/**
 * Created by Osito on 18/07/2016.
 */

export class ProductCreateController{
    /*@ngInject*/
    constructor($uibModalInstance){
        this.$uibModalInstance = $uibModalInstance;
        this.product = {
            name: null,
            period: 1
        }
    }

    ok() {
        this.$uibModalInstance.close(this.product);
    };

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    };
}