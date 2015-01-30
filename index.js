var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http),
    name = "";

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('name', function(data) {
      socket.name = data;
      io.sockets.emit('name', name);
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', { name: socket.name, data: msg });
  });

});http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
