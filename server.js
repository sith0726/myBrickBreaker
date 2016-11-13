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

Client to Server Signal list:
"joinGameRequest" : this singal is sent by player when he pressed multiplayer button.
                    The server will try to match or create a lobby.
"disconnect" :  sent by player when disconnect.
                If player is in lobby, remove that player in lobby.
                If player is in game, change the player's side to wall.
"ready" :   sent by player when he/she is ready in lobby.
            When both players are ready, the game starts.
"move" : Sent when player moves. Contains the new position of paddle.

Server to Client Signal list:
"lobbyInfo" : Contains the info of lobby. Sent when updating lobby info.
"playerDisconnect" : Notify that players leaves the game.
"mapUpdate" : Contains the new position of paddles of both players.
"serverShutDown" : server shut down.

""
*/
io.on('connection', handleConnection);
function handleConnection(socket) {
      socket.on('joinGameRequest', handleJoinGame);
      socket.on('disconnect', handleDisconnect);
      socket.on('ready', handleReady);
      socket.on('handleMove', handleMove);
}

//joinGameRequest
function handleJoinGame(message) {

}

//disconnect
function handleDisconnect(message) {

}

//ready
function handleReady(message) {

}

//move
function handleMove(message) {

}

/*
Start server listening port 3000.
*/
http.listen(3000, function() {
    console.log('listening on 3000');
})