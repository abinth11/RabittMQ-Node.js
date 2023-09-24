const amqplib = require('amqplib');

const queueName = "abc";

const receiveMsg = async () => {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, { durable: false });

  console.log('Waiting for messages. To exit, press Ctrl+C');

  channel.consume(queueName, (msg) => {
    if (msg !== null) {
      console.log('Received Message: ', msg.content.toString());
      channel.ack(msg); // Acknowledge the message
    }
  },{noAck:false});
}

receiveMsg();
