var fs = require('fs');
var csv = require('csv');
var readline = require('readline');
var stream = require('stream');
var numeric = require('numeric');
willConvertToCSV('05Apr14.00z.g15.tpwc_merged_cimss_exp_rets2_a');

var spatialRes = 0.5;
var spatialResInv = Math.pow(spatialRes,-1);

////exports.willConvertToCSV = function(filenameNoExt) {
function willConvertToCSV(filenameNoExt) {
    var fullCSV = "";
    var instream = fs.createReadStream(filenameNoExt);
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);
    rl.on('line', function (line) {
        // process line here
        line = line.substr(0, 8) + ','
            + line.substr(8, 10) + ','
            + line.substr(18, 10) + ','
            + line.substr(28, 11) + ','
            + line.substr(39, 6) + ','
            + line.substr(45, 6) + ','
            + line.substr(51, 10) + ','
            + line.substr(61, 8) + ','
            + line.substr(69, 8) + ','
            + line.substr(77, 8) + ','
            + line.substr(85, 6) + ','
            + line.substr(91, 10) + ','
            + line.substr(101, 10) + ','
            + line.substr(111, 6) + ','
            + line.substr(117, 8) + ','
            + line.substr(125, 6) + ','
            + line.substr(131, 9) + ','
            + line.substr(140, 8) + ','
            + line.substr(148, 8) + ','
            + line.substr(156, 8) + ','
            + line.substr(164, 8) + ','
            + line.substr(172, 8);
        line = line.replace(/ /g, '') + '\n';
        fullCSV += line;
    });

    rl.on('close', function () {
        csv().from.string(fullCSV)
            .to.array(function (data) {
//                console.log(fullCSV);
                processData(data);
            });
    });
};

var data = [], latArray = [], lonArray = [], WV1 = [];

function processData(csvData) {
    //Step 1 - Transpose Data, columns turned into arrays
    willFormatArray(csvData);
    willSetupVariables();
    willSetupGrid();
    willBoxData();

}

//Transposes Array
function willFormatArray(array) {
    //Pop off variable header
    array.splice(0, 1);
    //Transpose Array
    data = array[0].map(function (col, i) {
        return array.map(function (row) {
            return row[i]
        })
    });
}

function willSetupVariables() {
    latArray = data[2];
    lonArray = data[3];
    WV1 = data[7];
}

function willSetupGrid() {
    lonArrayGrid = [];
    for (var i = -48; i < -140; i -= spatialRes) {
        lonArrayGrid.push(Math.ceil(i * spatialResInv) / spatialResInv);
    }

    latArrayGrid = [];
    for (var i = 7; i < 59; i += spatialRes) {
        latArrayGrid.push(Math.ceil(i * spatialResInv) / spatialResInv);
    }
}

function willBoxData() {
    var latlonAddressArray = [];
    var latitudeRoundedArray = [];
    var longitudeRoundedArray = [];

    for (var i = 0, len = latArray.length; i < len; i++) {
        var latitudeRounded = Math.round(latArray[i] * spatialResInv) / spatialResInv;
        var longitudeRounded = -Math.round(lonArray[i] * spatialResInv) / spatialResInv;

        latitudeRoundedArray.push(latitudeRounded);
        longitudeRoundedArray.push(longitudeRounded);
        latlonAddressArray.push(latArrayGrid.indexOf(latitudeRounded).toString() + '.' + lonArrayGrid.indexOf(longitudeRounded).toString());
    }

    var latAvgArray = [];
    var lonAvgArray = [];
    var wv1AvgArray = [];
    var addressesFound = [];

    for (var j = 0; j < latlonAddressArray.length; j++) {
        var address = latlonAddressArray[j];

        var latDuplicate = [];
        var lonDuplicate = [];
        var wv1Duplicate = [];

        var addressHasNotBeenFound = (addressesFound.indexOf(address) >= 0) ? false : true;

        if (addressHasNotBeenFound) {
            for (var k = 0; k < latlonAddressArray.length; k++) {
                if (address === latlonAddressArray[k]) {
                    latDuplicate.push(latitudeRoundedArray[k]);
                    lonDuplicate.push(longitudeRoundedArray[k]);
                    wv1Duplicate.push(parseFloat(WV1[k]));
                }
            }

            addressesFound.push(address);

            var latAvg = (numeric.sum(latDuplicate)) / latDuplicate.length;
            var lonAvg = (numeric.sum(lonDuplicate)) / lonDuplicate.length;
            var wv1Avg = (numeric.sum(wv1Duplicate)) / wv1Duplicate.length;

            console.log(lonAvg+',');
            latAvgArray.push(latAvg);
            lonAvgArray.push(lonAvg);
            wv1AvgArray.push(wv1Avg);
        }
    }
//    console.log(latAvgArray);

    willCreateGoogleMapsObject(latAvgArray,lonAvgArray,wv1AvgArray);

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

function GoogleMapRectangleVars(lat,lon){
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