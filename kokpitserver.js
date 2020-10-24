/**
 * Kokpit Server code for handling Kafka client calls on the server
 */

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
    console.log("Kokpit: /publish called");    
    console.log("Kokpit: received "+req.body.brokerHost+':'+req.body.brokerPort, req.body.topicName, req.body.message);
    producer(req.body.brokerHost+':'+req.body.brokerPort, req.body.topicName, req.body.message, res);
});

//to handle consume requests
app.post('/consume', function(req, res, next){
    //TODO: add group to UI
    console.log("Kokpit: /consume called \n"+req.body.brokerHost+':'+req.body.brokerPort, "kokpitgroup", req.body.topicName);
    consumer(req.body.brokerHost+':'+req.body.brokerPort, "kokpitgroup", req.body.topicName, io);
});

 
  
