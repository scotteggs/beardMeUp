'use strict';
var chalk = require('chalk');

// Requires in ./db/index.js -- which returns a promise that represents
// mongoose establishing a connection to a MongoDB database.
var startDb = require('./db');


var fs = require('fs');
// console.log("dirname is ", __dirname)
var https = require('https');
// var root = app.getValue('projectRoot');
var path = require('path');
var privateKeyPath = path.join(__dirname,'./key.pem')
var certificatePath = path.join(__dirname,'./cert.pem')
var privateKey  = fs.readFileSync(privateKeyPath, 'utf8');
var certificate = fs.readFileSync(certificatePath, 'utf8');
var credentials = {key: privateKey, cert: certificate};

// Create a node server instance! cOoL!
// var server = require('https').createServer(credentials);

//http
var server = require('http').createServer();



var createApplication = function () {
    var app = require('./app');
    server.on('request', app); // Attach the Express application.
    require('./io')(server);   // Attach socket.io.
};

var startServer = function () {

    var PORT = process.env.PORT || 1337;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

startDb.then(createApplication).then(startServer).catch(function (err) {
    console.error(chalk.red(err.stack));
    process.kill(1);
});
