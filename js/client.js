var socket = io("https://demo.ekullanici.com:3000" );
var uname=generateName();
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('message', {
      msg: input.value,
      user: uname,
      to: 'everyone',
    });
    input.value = '';
  }
});

socket.on('message', function(msg) {
  var item = document.createElement('li');
  item.textContent = msg.uname + ":" + msg.text;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
  
});

socket.on('connect', function() {
  
  socket.emit('iconnect', {
      uname: uname//user props here, user type , name , id 
  });
  
});

socket.on('deneme', function(msg) {
  console.log("deneme");
  console.log(msg);
});
socket.on('disconnected', function() {
  socket.emit('disconnected', "");
});