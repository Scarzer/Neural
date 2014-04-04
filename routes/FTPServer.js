var JSFtp = require("jsftp");
var exec = require('child_process').exec, child;
//Initialize FTP Connection
var Ftp = new JSFtp({
    host: "ftp.ssec.wisc.edu"
});

var isClockPaused = false;
//Initialize the arrays
var arrayEven = new Array();
var arrayOdd = new Array();
//Initializing the array comparison
var comparedArray = new Array();
//Index of timer
var index = 0;

//Start the time interval, checks every minute
setInterval(function () {
    if (!isClockPaused) {
        index++;
        console.log(index);
        if (index % 2 === 0) {
            shouldListFTPFilesEven();
        } else {
            shouldListFTPFilesOdd();
        }
    }
}, 5000);

//If the index is on an Even number, list the files and store to the even array
function shouldListFTPFilesEven() {
    console.log('On Even');
    Ftp.ls('pub/ssec/rtascii/sndrtpw', function (err, res) {
        arrayEven = [];
        res.forEach(function (file) {
            arrayEven.push(file.name);
        });
    });
    console.log(arrayEven.length);
    shouldCompareArrays(arrayEven, arrayOdd)
}
//If the index is on an Odd number, list the files and store to the odd array
function shouldListFTPFilesOdd() {
    console.log('On Odd');
    Ftp.ls('pub/ssec/rtascii/sndrtpw', function (err, res) {
        arrayOdd = [];
        res.forEach(function (file) {
            arrayOdd.push(file.name);
        });
    });
    console.log(arrayOdd.length);
    shouldCompareArrays(arrayOdd, arrayEven);
}

//Should compare the files that are in the new array, but not in the old array
function shouldCompareArrays(newArray, oldArray) {
    comparedArray = [];
    oldArray.forEach(function (key) {
        if (-1 === newArray.indexOf(key)) {
            comparedArray.push(key);
        }
    }, this);

    //This weird conditional for 1 and 2... for file checking
    if (comparedArray.length > 0 & index !== 1 & index !== 2) {
        isClockPaused = true;
        shouldDownloadFile();
    }

    console.log(comparedArray);
}

var arrayIndex = 0;

//Should download the files in the comparison array
function shouldDownloadFile() {
    var file = comparedArray[arrayIndex++];
    var ftpFileExtension = 'pub/ssec/rtascii/sndrtpw/' + file;
    var localFileExtension = 'downloads/' + file;
    Ftp.get(ftpFileExtension, localFileExtension, function (hadErr) {
        if (hadErr) {
            console.log('There was an error retrieving the file.');
        } else {
            console.log('Downloaded the file.');
            //Uncompress
            shouldUncompressFile(file);
        }
    });

}

function shouldUncompressFile(filename) {
    child = exec('uncompress downloads/' + filename,
        function (error, stdout, stderr) {

            //Should have a return ...
            if (error !== null) {
                console.log('exec error: ' + error);
            }

            //Post process
            if (arrayIndex < comparedArray.length) {
                shouldDownloadFile();
            } else {
                console.log('Finished downloading + uncompressing');
                arrayIndex = 0;
                isClockPaused = false;
            }

        });
}

function shouldCSVifyFile(){

}
