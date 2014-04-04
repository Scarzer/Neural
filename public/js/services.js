'use strict';
/* Services */
// Demonstrate how to register services
var myModule = angular.module('myApp.services', []).
    value('version', '0.1');

myModule.factory('mySharedService', function ($rootScope) {
    var sharedService = {};
    sharedService.message = '';
    sharedService.comingFrom = '';
    sharedService.prepForBroadcast = function (msg,cf) {
        this.message = msg;
        this.comingFrom = cf;
        this.broadcastItem();
    };
    sharedService.broadcastItem = function () {
        $rootScope.$broadcast('handleBroadcast');
    }
    return sharedService;
});

myModule.factory('Page', function() {
   var title = 'default';
   return {
     title: function() {return title;},
     setTitle: function(newTitle) {title = newTitle}
   };
});