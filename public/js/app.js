'use strict';

//Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
    config(function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'partials/home',
            }).
            otherwise({
                redirectTo: '/home'
            });
        $locationProvider.html5Mode(true);
    });