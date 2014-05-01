// TODO Include a field that indicates passed update cycles. Periodically delete all data that's N cycles
var fs = require('fs');
var csv = require('csv');
var readline = require('readline');
var mongoClient  = require('mongodb');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.post('/mapQuery', function(req, res){
    console.log(req);
    res.end();
});

app.listen(3210);

var fullCSV = [];
var rd = readline.createInterface({
    input: fs.createReadStream('./sedEdFile'),
    output: fs.createWriteStream('/dev/null'),
    terminal: false
}).
on('line', function(line, count){

        dataLine = [];

        dataLine.push( parseFloat( line.substr(0, 8)    ) );
        dataLine.push( parseFloat( line.substr(8, 10)   ) );
        dataLine.push( parseFloat( line.substr(18, 10)  ) );
        dataLine.push( parseFloat( line.substr(28, 11)  ) );
        dataLine.push( parseFloat( line.substr(39, 6)   ) ); 
        dataLine.push( parseFloat( line.substr(45, 6)   ) );
        dataLine.push( parseFloat( line.substr(51, 10)  ) );
        dataLine.push( parseFloat( line.substr(61, 8)   ) );
        dataLine.push( parseFloat( line.substr(69, 8)   ) );
        dataLine.push( parseFloat( line.substr(77, 8)   ) );
        dataLine.push( parseFloat( line.substr(85, 6)   ) );
        dataLine.push( parseFloat( line.substr(91, 10)  ) );
        dataLine.push( parseFloat( line.substr(101, 10) ) );
        dataLine.push( parseFloat( line.substr(111, 6)  ) );
        dataLine.push( parseFloat( line.substr(117, 8)  ) );
        dataLine.push( parseFloat( line.substr(125, 6)  ) );
        dataLine.push( parseFloat( line.substr(131, 9)  ) );
        dataLine.push( parseFloat( line.substr(140, 8)  ) );
        dataLine.push( parseFloat( line.substr(148, 8)  ) );
        dataLine.push( parseFloat( line.substr(156, 8)  ) );
        dataLine.push( parseFloat( line.substr(164, 8)  ) ); 
        dataLine.push( parseFloat( line.substr(172, 8)  ) );

        if(isNaN(dataLine[3]) || isNaN(dataLine[2]) ) {
            console.log("Returning!!");
            return; 
        };

        fullCSV.push({
            dataLine : dataLine,
            loc      : { type : "Point", coordinates : [dataLine[3], dataLine[2] ]}
        });

})
.on('close', function(a,b,c){
        fullCSV.shift();
        mongoClient.connect('mongodb://nightshops.info:27017/weatherData', function(err, db){
            if(err) throw err;

            var collection = db.collection('weatherLoc');

            collection.insert( fullCSV , function(err, a, b){
                if(err) throw err;

                collection.count( function(err, count){
                    if(err) throw err;

                    console.log(count);
                    db.close();
                    });
                });

            // Index for geospacial location!
            collection.ensureIndex( {loc : '2dsphere' } , { sparse : true},  function(err){
                if(err) throw err;
                });
        });
});


