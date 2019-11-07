var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use('/static', express.static(__dirname+'/static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('draw', function(msg){
    io.emit('draw', msg);
  });
  socket.on('chat', function(msg){
    io.emit('chat', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
