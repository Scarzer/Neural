var fs = require('fs');
var csv = require('csv');
var readline = require('readline');
var stream = require('stream');
var numeric = require('numeric');
var rbush  = require('rbush');
var express = require('express');
var app = express();
//willConvertToCSV('05Apr14.00z.g15.tpwc_merged_cimss_exp_rets2_a');
var spacialTree = willParseStream('testData.csv');

var spatialRes = 0.5;
var spatialResInv = Math.pow(spatialRes,-1);

////exports.willConvertToCSV = function(filenameNoExt) {

function willParseStream(filenameNoExt){
    var inStream = fs.createReadStream(filenameNoExt);
    var outStream = fs.createWriteStream('/dev/null');
    var rl = readline.createInterface(inStream, outStream);
    var tree = rbush(9,['.minLng', '.minLat', '.maxLng', '.maxLat']);

    rl.on('line', function(line){
        var subArr = line.trim().split(' ');
        
        // Holds the Lat and Lng
        var lng = parseFloat(subArr[3]);
        var lat = parseFloat(subArr[2]);

        // Toss out the first line
        if( isNaN(lng) || isNaN(lat) ) return;
        
        var point = {
            minLng : lng,
            maxLng : lng,
            minLat : lat,
            maxLat : lat,
            latPos : lat,
            lonPos : lng,
            WV1    : parseFloat(subArr[7])
        }
        tree.insert(point);
    });

    rl.on('close', function(){
        console.log("Map Area is " + tree.toJSON().bbox);
        app.get('/getTable', function(req, res){
            res.send(tree.toJSON())
            res.end();
        });
        app.listen(3000);
        //console.log(tree.toJSON());
        
    });

}

//willMakeRectangles();
//
//willCreateGoogleMapsObject(latAvgArray,lonAvgArray,wv1AvgArray);



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
