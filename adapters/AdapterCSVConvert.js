var fs = require('fs');
var csv = require('csv');
var readline = require('readline');
var stream = require('stream');
var numeric = require('numeric');
var rbush  = require('rbush');
var express = require('express');
var app = express();

app.use(express.static(__dirname + "/public"));


var pointsToInsert = [];
var spacialTree = willParseStream('testData.csv');
var spatialRes = 0.5;
var spatialResInv = Math.pow(spatialRes,-1);

////exports.willConvertToCSV = function(filenameNoExt) {

function willParseStream(filenameNoExt){
    var inStream = fs.createReadStream(filenameNoExt);
    var outStream = fs.createWriteStream('/dev/null');
    var rl = readline.createInterface(inStream, outStream);
    var tree = rbush(16,['.minLng', '.minLat', '.maxLng', '.maxLat']);

    rl.on('line', function(line){
        var subArr = line.trim().split(' ');
        
        // Holds the Lat and Lng
        var lng = parseFloat(subArr[3]);
        var lat = parseFloat(subArr[2]);

        // Toss out the first line
        if( isNaN(lng) || isNaN(lat) ) return;
        
    });

    rl.on('close', function(){
        console.log("Map Area is " + tree.toJSON().bbox);
        console.log(tree.toJSON());
        app.get('/getTable', function(req, res){
            res.send(tree.toJSON());
            res.end();
        });

        app.listen(3000);
        
    });

}


function willCreateGoogleMapsObject(lat,lon,data){

    var rectangleArray =[];

    for(var i = 0 ; i <lat.length ; i++){
        var rect = new GoogleMapRectangleVars(lat[i],lon[i]);
        rect.strokeColor = "#FF0000";
        rect.strokeOpacity = 0.8;
        rect.strokeWeight = 2;
        rect.fillColor = "#FF0000";
        rect.fillOpacity = 0.35;

        rectangleArray.push(rect);
    }

    console.log(rectangleArray);
}

function GoogleMapRectangleVars(lon,lat){
    this.strokeColor="";
    this.strokeOpacity=0;
    this.strokeWeight=0;
    this.fillColor="";
    this.fillOpacity=0;
    this.lowerLat = lat-spatialRes/2;
    this.upperLat = lat+spatialRes/2;
    this.lowerLon = lon-spatialRes/2;
    this.upperLon = lon+spatialRes/2;

}

//NOTES
//INVERSE DISTANCE WEIGHTING
