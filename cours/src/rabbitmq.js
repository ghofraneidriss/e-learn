const amqp = require('amqplib');

const EXCHANGE = 'course.exchange';
const QUEUE = 'course.queue';

async function createPublisher() {
  const url = process.env.RABBITMQ_URL;

  if (!url) {
    return {
      publish: async () => undefined,
    };
  }

  try {
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE, 'topic', { durable: true });
    await channel.assertQueue(QUEUE, { durable: true });
    await channel.bindQueue(QUEUE, EXCHANGE, 'course.#');

    return {
      publish: async (routingKey, payload) => {
        const message = Buffer.from(JSON.stringify(payload));
        channel.publish(EXCHANGE, routingKey, message, { persistent: true });
      },
    };
  } catch (error) {
    console.warn('RabbitMQ not available for cours service:', error.message);
    return {
      publish: async () => undefined,
    };
  }
}

module.exports = {
  createPublisher,
  EXCHANGE,
  QUEUE,
};
