//Kafka Producer
//setup
console.log("Kafka producer");
const { Kafka } = require('kafkajs');

module.exports = async function producer(broker, topicName, message, res) {
  console.log("Kokpit: Kafka producer with " + broker + " topic as " + topicName + "message as " + message);
  //initialize
  const kafka = new Kafka({
    clientId: 'kokpit-talking',
    //externalize
    brokers: [broker]
  });

  const producer = kafka.producer();
  res.writeHead(200, { 'Content-Type': 'text/plain' });


  //working code
  //await producer.connect();
  try {
    await producer.connect();
    res.write("Connected");

  } catch (error) {
    console.log("Error: ***Kokpit Couldn't connect to Kafka broker");
    res.end("Error: Couldn't connect to Kafka broker");

    return;
  }
  console.log("***Kokpit-publishing message...");

  await producer.send({
    topic: topicName,
    messages: [
      { value: message },
    ],
  });
  console.log("Kokpit: message published");
  
  res.end("Message " + message + " published");

  await producer.disconnect();

}