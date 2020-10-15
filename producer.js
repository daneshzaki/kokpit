//Kafka Producer
//setup
console.log("Kafka producer");
const { Kafka } = require('kafkajs');

module.exports = async function producer(broker, topicName, message) {
  console.log("Kafka producer with "+broker+" topic as "+topicName+ "message as "+message);
  //initialize
  const kafka = new Kafka({
    clientId: 'kokpit-talking',
    //externalize
    brokers: [broker]
  });

  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: topicName,
    messages: [
      { value: message },
    ],
  });
  console.log("message sent");

  await producer.disconnect();

}