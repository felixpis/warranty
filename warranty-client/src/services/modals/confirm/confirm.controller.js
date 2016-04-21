/**
 * Created by felixp on 26/11/2015.
 */

export class ConfirmController{
    constructor($uibModalInstance, text){
        this.$uibModalInstance = $uibModalInstance;
        this.text = text;
    }

    ok() {
        this.$uibModalInstance.close(true);
    };

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    };

}