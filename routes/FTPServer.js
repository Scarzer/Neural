var JSFtp = require("jsftp");
var exec = require('child_process').exec, child;
var adapterCSVConvert = require('../adapters/AdapterCSVConvert');
//Initialize FTP Connection
var Ftp = new JSFtp({
    host: "ftp.ssec.wisc.edu"
});

var ftpClass = new FTPClass('pub/ssec/rtascii/sndrtpw/','downloads/tp/', 'uncompress downloads/tp/');

function FTPClass(ftpSubDirectory, downloadDirectory, uncompressBashCommand) {
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
    }, 60000);

    //If the index is on an Even number, list the files and store to the even array
    function shouldListFTPFilesEven() {
        console.log('On Even');
        Ftp.ls(ftpSubDirectory, function (err, res) {
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
        Ftp.ls(ftpSubDirectory, function (err, res) {
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
    //If you wanna public access to this function
    //this.downloadFile = function shouldDownloadFile(){

    function shouldDownloadFile(){
//        var file = '01Apr14.00z.g15.tpwp_merged_cimss_exp_rets2_a.Z';
        var file = comparedArray[arrayIndex++];
        var ftpFileExtension = ftpSubDirectory + file;
        var localFileExtension = downloadDirectory + file;
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
        child = exec(uncompressBashCommand + filename,
            function (error, stdout, stderr) {

                //Should have a return ...
                if (error !== null) {
                    //DO SOMETHING ABOUT HTIS ERROR
                    console.log('exec error: ' + error);
                }else{
                    //Process
                    fileNameNoExtArray = filename.split('.');
                    fileNameNoExtArray.splice(fileNameNoExtArray.length - 1);
                    var filenameNoExt = fileNameNoExtArray.join('.');
                    //CSV shit - should make it tp sn or tp specific (surround with conditional)
                    adapterCSVConvert.willConvertToCSV('./'+ downloadDirectory + filenameNoExt);

                    //Post process
                    if (arrayIndex < comparedArray.length) {
                        shouldDownloadFile();
                    } else {
                        console.log('Finished downloading + uncompressing');
                        arrayIndex = 0;
                        isClockPaused = false;
                    }
                }
            });
    }
}