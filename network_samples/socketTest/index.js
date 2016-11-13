var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var count = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('iClick', function(message) {
      console.log(message['my']);
      socket.broadcast.emit('c++');
  });
});

http.listen(3000, function(){
  console.log('listening on 3000');
});

