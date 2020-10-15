//Kafka Consumer
//setup
console.log("Kafka consumer");
const { Kafka } = require('kafkajs');

//subscriber

module.exports = async function consumer(broker, group, topicName, io) {
  console.log("^^^^^^Kafka consumer with " + broker + " topic as " + topicName + " group as " + group);

  const kafka = new Kafka({
    clientId: 'kokpit-talking',
    //externalize
    brokers: [broker]
  });

  const consumer = kafka.consumer({ groupId: group });

  await consumer.connect();
  console.log("^^^^^^Kafka consumer connected");

  await consumer.subscribe({ topic: topicName, fromBeginning: true });
  console.log("^^^^^^Kafka consumer subscribed");
  console.log("consuming...");
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {

      /*console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),});*/

      //working code
      //res.send(message.value.toString());
      io.sockets.emit('message', message.value.toString());


      //todo: send continous messages to browser - use socket.io
    },
  });

}