import amqp from "amqplib/callback_api.js";

export function send(code, language) {
	amqp.connect("amqp://localhost:5672", (error0, connection) => {
		if (error0) {
			throw error0;
		}
		connection.createChannel((error1, channel) => {
			if (error1) {
				throw error1;
			}

			var queue = "compiler";
			var msg = JSON.stringify([code, language]);

			channel.assertQueue(queue, {
				durable: false,
			});
			channel.sendToQueue(queue, Buffer.from(msg));
			console.log("message sent to queue");
		});

		setTimeout(() => {
			connection.close();
			process.exit(0);
		}, 500);
	});
}
