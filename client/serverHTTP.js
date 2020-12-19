var fs = require('fs');
var http = require('http');
//var https = require('https');
//var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
//var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

//var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

// your express configuration here

var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);
var port = 8000;
//var port2 = 8001;

app.use(express.static(__dirname + '/build'));
httpServer.listen(port, () => console.log('HTTP  webserver running on port %d', port));
//httpsServer.listen(port2, () => console.log('HTTPS webserver running on port %d', port2));

//httpServer.listen(8080);
//httpsServer.listen(8443);