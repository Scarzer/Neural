var fs = require('fs');
var csv = require('csv');
var readline = require('readline');
var rbush = require('rbush');


var tree = rbush(9, ['.minLng', '.minLat', '.maxLng', '.maxLat']);

tree.load([
    { minLng : 123.1, minLat : 153, maxLng : 123.1, maxLat : 153, foo:123},
    { minLng : 120, minLat: 173, maxLng : 120, maxLat : 173}]);

console.log(tree.toJSON());


