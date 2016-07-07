/**
 * Created by felixp on 18/11/2015.
 */

import './assets/site.css';

import statesModule from './states/states';
import modelsModule from './models/models.module';
import dataModule from './data/data.module';
import servicesModule from './services/services.module';

let dependencies = [
    'ui.bootstrap',
    'flow',

    statesModule.name,
    modelsModule.name,
    dataModule.name,
    servicesModule.name
];

angular.module('warrantyApp', dependencies)
    .constant('CONFIG', {
        serverUrl : $_SERVER_URL
    });
