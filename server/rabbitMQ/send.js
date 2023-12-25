import amqp from "amqplib/callback_api.js";

/**
 * Connect to rabbitMQ , create a queue (if needed), send params
 * to queue
 *
 * @param {string} code
 * @param {string} language
 * @param {string} id
 */
// rabbitmq
export function send(code, language, id) {
	amqp.connect("amqp://rabbitmq:5672", (error0, connection) => {
		if (error0) {
			throw error0;
		}
		connection.createChannel((error1, channel) => {
			if (error1) {
				throw error1;
			}

			var queue = "compiler";
			var msg = JSON.stringify([code, language, id]);

			channel.assertQueue(queue, {
				durable: true,
			});

			channel.sendToQueue(queue, Buffer.from(msg));

			console.log("message sent to queue");
		});

		setTimeout(() => {
			connection.close();
		}, 500);
	});
}
