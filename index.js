var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var name = "小黄鸡: "
var request = require('superagent');
var ai = require('./ai');
app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    msg = msg.split(":")[1].trim()
    if (msg.indexOf("问") != -1 && msg.indexOf("答") != -1){
      var idx1 = msg.indexOf("问")
      var idx2 = msg.indexOf("答")
      var q = msg.slice(idx1+1, idx2).trim();
      var a = msg.slice(idx2+1).trim();
      ai.addQA(q,a,function(){
        io.emit("ai message", name + "好哒，我学会啦")
      })
    } else{
      ai.answer(msg).then(function(qas){
        var l = qas.length  //已有几种回答
        if (l==0){
          io.emit("ai message", name + "我还不会回答这个问题，你教我好不好， 输入 问 xxx 答 xxx")
        }else{
          var qa = qas[Math.floor( Math.random() * l )]
          io.emit("ai message", name + qa['a']);
        }
      })
    }
  });
});

http.listen(app.get('port'), function(){});
