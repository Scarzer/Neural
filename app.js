//Dependencies
var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http');
    ftpServer = require('./routes/FTPServer.js');
var app = express();

// Configuration
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.engine('.html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.set('view options', {
        layout: false
    });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'omgnodeworks' }));
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
//app.get('/partials/:name', routes.partials);
//
////WORK API
//app.get('/api/work', api.work);
//app.get('/api/workgallery/:id', api.workGallery);
////MUSIC API
//app.get('/api/music', api.music);
////DESIGN API
//app.get('/api/design', api.design);
//app.get('/api/designgallery/:id', api.designGallery);
//// redirect all others to the index (HTML5 history)
////CONTACT API
//app.post('/api/contact',api.contact);

app.get('*', routes.index);

//Create server
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port: " + app.get('port'));
});