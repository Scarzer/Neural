'use strict';
/* View-Controllers */
//-------------------------------------------------------------------------------//
//Index Controller (executesOnStart)
//-------------------------------------------------------------------------------//
function IndexController($scope,$http) {
// $("div").hide();

// $(document).ready(function(){
//     $("div").find("img").load(function(){
//         $("div").show();
//     });
// });
}
//-------------------------------------------------------------------------------//
//Home View Controller 
//-------------------------------------------------------------------------------//
function HomeClicker($scope) {
    $scope.open = function () {
        $('html,body').animate({ scrollTop: $('#home').offset().top - 50}, 2000);
    }
}
//-------------------------------------------------------------------------------//
//Work View Controller 
//-------------------------------------------------------------------------------//
function WorkClicker($scope) {
    $scope.open = function () {
        $('html,body').animate({ scrollTop: $('#work').offset().top - 50}, 2000);
    }
}
function WorkItems($scope, $http) {
    $scope.posts = [];
    $http.get('/api/work').
        success(function (data, status, headers, config) {
            $scope.posts = data.posts;
        });
    $scope.moreButtonWasClicked = function (msg, comingFrom) {
        $('#' + comingFrom).trigger('click');
    };
};
//-------------------------------------------------------------------------------//
//Research View Controller 
//-------------------------------------------------------------------------------//
function ResearchClicker($scope) {
    $scope.open = function () {
        $('html,body').animate({ scrollTop: $('#research').offset().top - 50 }, 2000);
    }
}
function ResearchItems($scope, $http) {
    $scope.posts = [];
    $http.get('/api/research').
        success(function (data, status, headers, config) {
            $scope.posts = data.posts;

            //Figure out a way to split up the json so we can have an embedded ng-repeat 
            // for (var i = 0; i < $scope.posts.length; i++) {
            //     //Come in threes 
            //     if (i % 3 == 0) {
            //         var entry = $scope.posts[i];
            //     }
            // }
            //alert($scope.posts);
        });
    // $scope.moreButtonWasClicked = function (msg, comingFrom) {
    //     $('#'+ comingFrom).trigger('click');
    // };
};
//-------------------------------------------------------------------------------//
//Music View Controller 
//-------------------------------------------------------------------------------//
function MusicClicker($scope) {
    $scope.open = function () {
        $('html,body').animate({ scrollTop: $('#music').offset().top - 50}, 2000);
    }
}

function SoundCloudController($scope, $http) {
    $scope.tracks = [];
    $http.get('/api/music').
        success(function (data, status, headers, config) {
            $scope.tracks = data.tracks;
        });
}
//-------------------------------------------------------------------------------//
//Design View Controller 
//-------------------------------------------------------------------------------//
function DesignClicker($scope) {
    $scope.open = function () {
        $('html,body').animate({ scrollTop: $('#design').offset().top - 50 }, 2000);
    }
}

function DesignItems($scope, $http) {
    $scope.posts = [];
    $http.get('/api/design').
        success(function (data, status, headers, config) {
            $scope.posts = data.posts;
        });
    $scope.moreButtonWasClicked = function (msg, comingFrom) {
        $('#' + comingFrom).trigger('click');
    };
};
//-------------------------------------------------------------------------------//
//Contact View Controller Functions
//-------------------------------------------------------------------------------//
function ContactController($scope, $http) {
    $scope.sender = "";
    $scope.message = "";
    $scope.open = function ($scope) {
        $('#modalwerd').modal('toggle');
        $('#loading-gif').hide();
    };
    //Send to email
    $scope.send = function () {
        $('#loading-gif').show();
        var sender = $scope.contact.sender;
        var message = $scope.contact.message;
        $http.post('/api/contact', {
            name: sender,
            message: message
        }).
            success(function (data, status, headers, config) {
                $scope.contact.sender = "";
                $scope.contact.message = "";
                $('#loading-gif').hide();
                $('#modalwerd').modal('toggle');
            });
    };
};