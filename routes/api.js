//Serve JSON to our AngularJS client

var nodemailer = require("nodemailer");
var data = require("./data");
var JSFtp = require("jsftp");
var sleep = require("sleep");

//-------------------------------------------------------------------------------//
//WORK Web Services
//-------------------------------------------------------------------------------//
//Load all posts 
exports.work = function (req, res) {
    res.json(data.jsonWork);
};
//-------------------------------------------------------------------------------//
//RESEARCH Web Services
//-------------------------------------------------------------------------------//
exports.research = function (req, res) {
    res.json(data.jsonResearch);
};
//-------------------------------------------------------------------------------//
//MUSIC Web Services
//-------------------------------------------------------------------------------//
//Load all posts 
exports.music = function (req, res) {
    res.json(data.jsonMusic);
};
//-------------------------------------------------------------------------------//
//DESIGN Web Services
//-------------------------------------------------------------------------------//
//Load all posts 
exports.design = function (req, res) {
    res.json(data.jsonDesign);
};
//-------------------------------------------------------------------------------//
//CONTACT Web Services
//-------------------------------------------------------------------------------//
exports.contact = function (req, res) {
    var sender = req.body.name;
    var mess = req.body.message;
    console.log("Sender is " + sender);
    console.log("Message is " + mess);
    //create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: "crae.sosa@gmail.com",
            pass: "Ch4ng3M3N0W!!"
        }
    });
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: "<csosa246@gmail.com>", // sender address
        to: "crae.sosa@gmail.com", // list of receivers
        subject: "Message from : " + sender, // Subject line
        text: mess, // plaintext body
        html: "<b>" + mess + "</b>" // html body
    }
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            console.log("Message sent: " + response.message);
            res.json("Message sent: " + response.message);
        }
        smtpTransport.close(); // shut down the connection pool, no more messages
    });
}
//-------------------------------------------------------------------------------//
//Northrop FTP
//-------------------------------------------------------------------------------//
exports.ftp = function(req,res){


}

