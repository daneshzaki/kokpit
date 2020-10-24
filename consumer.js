/**
 * Kafka consumer code based on Kafka JS
 */

console.log("Kokpit: Kafka consumer");
const { Kafka } = require('kafkajs');

module.exports = async function consumer(broker, group, topicName, io) {
    console.log("Kokpit: Starting Kafka consumer with " + broker + " topic as " + topicName + " group as " + group);

    //setup
    const kafka = new Kafka({
        clientId: 'kokpit-talking',
        brokers: [broker]
    });

    const consumer = kafka.consumer({ groupId: group });

    //connect
    try 
    {
        await consumer.connect();
        io.sockets.emit('connected', "Connected");
    }
    catch (error)
    {
        console.log("Error: ***Kokpit Consumer Couldn't connect to Kafka broker");
        io.sockets.emit('error', "Error: Consumer couldn't connect to Kafka broker");
        return;
    }
    console.log("Kokpit: Kafka consumer connected");

    //subscribe
    try 
    {
        await consumer.subscribe({ topic: topicName, fromBeginning: true });
        io.sockets.emit('status', "Subscribed");
    }
    catch (error)
    {
        console.log("Error: ***Kokpit Consumer couldn't subscribe to topic");
        io.sockets.emit('error', "Error: Consumer couldn't subscribe to topic");
        return;
    }

    console.log("Kokpit: Kafka consumer subscribed");
    console.log("Kokpit: consuming...");

    //consuming
    try
    {
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
    
                console.log("Kokpit: consumer received message - "+message.value.toString());
                io.sockets.emit('message', message.value.toString());
            },
        });
    
    }
    catch (error)
    {
        console.log("Error: ***Kokpit Consumer couldn't consume message");
        io.sockets.emit('error', "Error: Consumer couldn't consume message");
    }

}