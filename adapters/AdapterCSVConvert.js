var fs = require('fs');
var csv = require('csv');
var readline = require('readline');

exports.shouldCSVify = function(filenameNoExt) {
    var fullCSV = "";
    readline.createInterface({
        input: fs.createReadStream(filenameNoExt),
        output: process.stdout,
        terminal: false
    })
        .on('line', function (line) {
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
        })
        .on('close', function () {
            csv().from.string(fullCSV)
                .to.array(function (data) {
                    console.log(data);
                });
        });
};