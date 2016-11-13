var express = require('express');
var app = express();

var myIP = '10.226.134.240:3000';

app.use('/main.html', function (req, res) {
    res.sendFile(__dirname + '/Main.html');
});

app.use('/js/createjs-2015.11.26.min.js', function (req, res) {
    res.sendFile(__dirname + '/js/createjs-2015.11.26.min.js');
});

app.use('/js/game.js', function (req,res) {
    res.sendFile(__dirname + '/js/game.js');
});

app.use('/resources', express.static('resources'))

app.listen(3000, function() {
    console.log('listening port 3000!');
})