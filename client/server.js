var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = 8000;
server.listen(port, () => console.log('webserver running on port %d', port));
app.use(express.static(__dirname + '/build'));