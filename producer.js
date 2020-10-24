/**
 * Kafka producer code based on Kafka JS
 */

//setup
console.log("Kokpit: Kafka producer");
const { Kafka } = require('kafkajs');

module.exports = async function producer(broker, topicName, message, res) {
    console.log("Kokpit: Kafka producer with " + broker + " topic as " + topicName + "message as " + message);
    //initialize
    const kafka = new Kafka({
        clientId: 'kokpit-talking',
        brokers: [broker]
    });

    const producer = kafka.producer();
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    //connect
    try
    {
        await producer.connect();
        res.write("Connected");

    }
     catch (error) {
        console.log("Error: ***Kokpit Producer Couldn't connect to Kafka broker");
        res.end("Error: Couldn't connect to Kafka broker");

        return;
    }
    console.log("Kokpit: publishing message...");
    
    //publish message
    try
    {
        await producer.send({
            topic: topicName,
            messages: [
                { value: message },
            ],
        });
        console.log("Kokpit: message published");

        res.end("Message - " + message + " published");

    }
    catch (error)
    {
        console.log("Error: ***Kokpit Producer Couldn't publish");
        res.end("Error: Couldn't publish message");
        return;
    }

    //disconnect
    try
    {
        await producer.disconnect();
    }
    catch (error)
    {
        console.log("Error: ***Kokpit Producer Couldn't disconnect");
        res.end("Error: Couldn't publish disconnect");

    }

}