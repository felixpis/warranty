/**
 * Created by felixp on 26/11/2015.
 */

import promptTemplate from './prompt/prompt.template.html';
import confirmTemplate from './confirm/confirm.template.html';

import {PromptController} from './prompt/prompt.controller';
import {ConfirmController} from './confirm/confirm.controller';

export class ModalsService{
    /*@ngInject*/
    constructor($uibModal){
        this.$uibModal = $uibModal;
    }

    prompt(value, title){
        let modalInstance = this.$uibModal.open({
            templateUrl: promptTemplate,
            controller: PromptController,
            controllerAs: 'prompt',
            resolve: {
                value: () => {
                    return value;
                },
                title: () => {
                    return title;
                }
            }
        });

        return modalInstance.result;
    }

    confirm(text){
        let modalInstance = this.$uibModal.open({
            templateUrl: confirmTemplate,
            controller: ConfirmController,
            controllerAs: 'confirm',
            resolve: {
                text: () => {
                    return text;
                }
            }
        });

        return modalInstance.result;
    }
}