var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('client/sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('client/sslcert/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app_Client = express();
var app_Server = express();

// your express configuration here

var http_Client = http.createServer(app_Client);
var http_Server = http.createServer(app_Server);
var https_Client = https.createServer(credentials, app_Client);

var portHTTP_Client = 8000;
var portHTTP_Server = 3001;
var portHTTPS_Client = 8001;


app_Client.use(express.static(__dirname + '/client/build'));
http_Client.listen(portHTTP_Client, () => console.log('HTTP  webserver running on port %d', portHTTP_Client));
https_Client.listen(portHTTPS_Client, () => console.log('HTTPS webserver running on port %d', portHTTPS_Client));

app_Server.use(express.static(__dirname + '/server/build'));
//http_Server.listen(portHTTP_Server, () => console.log('HTTP  webserver running on port %d', portHTTP_Server));

//httpServer.listen(8080);
//httpsServer.listen(8443);