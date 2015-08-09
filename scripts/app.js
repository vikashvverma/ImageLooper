'use strict';

/**
 * @ngdoc overview
 * @name imageLooperApp
 * @description
 * # imageLooperApp
 *
 * Main module of the application.
 */
angular
    .module('imageLooperApp', [
        'ngAnimate',
        'ui.router',
        'ngMaterial',
        'LocalStorageModule',
        'infinite-scroll',
        'firebase'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdIconProvider,localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('programminggeek')
            .setNotify(true, true);
        $urlRouterProvider
            .otherwise('/');
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl as vm'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $mdIconProvider.fontSet('fa', 'fontawesome');
    }).run(function(){
    });
