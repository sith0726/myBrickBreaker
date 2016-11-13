var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
/*-------------------------------------------------------------
NodeJS
/*-----------------------------------------------------------*/
//When user visits the webist, send index.html to user.
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//When user requests createJS, send createJS file.
app.use('/js/createjs-2015.11.26.min.js', function (req, res) {
    res.sendFile(__dirname + '/js/createjs-2015.11.26.min.js');
});

//When user requests the Main.js(game client), send Main.js
app.use('/js/Main.js', function (req,res) {
    res.sendFile(__dirname + '/js/Main.js');
});

//When user requests resources, send resources.
app.use('/resources', express.static('resources'));

/*-------------------------------------------------------------
Game Server
/*-----------------------------------------------------------*/
/*
When the user connects to server, call "handleConnection"
function. Set up the socket.
*/
io.on('connection', handleConnection);
function handleConnection(socket) {
    
}

/*
Start server listening port 3000.
*/
http.listen(3000, function() {
    console.log('listening on 3000');
})