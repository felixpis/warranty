/**
 * Created by felixp on 26/11/2015.
 */

export class PromptController {
    constructor($uibModalInstance, value, title) {
        this.$uibModalInstance = $uibModalInstance;

        this.value = value;
        this.title = title;
    }

    ok() {
        this.$uibModalInstance.close(this.value);
    };

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    };

}