//setup
var express = require('express');
var app = express();
var server = app.listen(8182);
var io = require('socket.io').listen(server);

//producer
const producer = require("./producer");

//consumer
const consumer = require("./consumer");

//to parse the payload
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


//to serve images etc
app.use(express.static('public'));

//to load index.html
app.get('/', function(req, res, next){
    res.sendFile(__dirname + '/public/index.html');
});

//to handle publish requests
app.post('/publish', function(req, res, next){
    console.log("**** /publish called");    
    console.log(req.body.brokerHost+':'+req.body.brokerPort, req.body.topicName, req.body.message);
    producer(req.body.brokerHost+':'+req.body.brokerPort, req.body.topicName, req.body.message);
    res.writeHead(200, {'Content-Type': 'text/plain'});  
    res.end("Message "+ req.body.message + " published");
});

//to handle consume requests
app.post('/consume', function(req, res, next){
    //TODO: add group to UI
    console.log("**** /consume called \n"+req.body.brokerHost+':'+req.body.brokerPort, "kokpitgroup", req.body.topicName);
    //todo remove the dummy responses
    /*io.sockets.emit('message',"dummy msg1");
    io.sockets.emit('message',"dummy msg2");
    io.sockets.emit('message',"dummy msg3");*/

    //todo uncomment this
    consumer(req.body.brokerHost+':'+req.body.brokerPort, "kokpitgroup", req.body.topicName, io);
});

 
  
