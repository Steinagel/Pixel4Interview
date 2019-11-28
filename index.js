var express = require('express');
var moment = require('moment');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var limit = 15;
var deadline = new Date();

var minutes = limit+deadline.getMinutes();
if(minutes>60){
  var hour = deadline.getHours();
  hour += minutes%60;
  minutes = minutes-((minutes%60)*60);
  deadline.setHours(hour);
  console.log(minutes, hour);
}
deadline.setMinutes(minutes);


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
  var x = setInterval(function(){
    var msg = count_time(x);
    io.emit('time', msg);
  },1000);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

// let jsonToDb = {};
// jsonToDb.body = $("table").html("");
// jsonToDb.dateTime = moment("").format("YYYY-MM-DD HH:mm:SS");
function count_time(x){
  var now = new Date(); 
  var t = deadline.getTime() - now.getTime(); 
  var days = Math.floor(t / (1000 * 60 * 60 * 24)); 
  var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
  var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
  var seconds = Math.floor((t % (1000 * 60)) / 1000); 
  timer_str = days + "d " + hours + "h " + minutes + "m " + seconds + "s "; 
  if (t <= 0) {
      clearInterval(x); 
      timer_str = "EXPIRED"; 
  }
  return timer_str;
}