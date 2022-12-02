import amqp from "amqplib";

export const consumer = async () => {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");
		const channel = await connection.createChannel();
		await channel.assertQueue("compiler", {
			durable: false,
		});
		let data;
		await channel.consume("compiler", (message) => {
			data = JSON.parse([message.content]);
			channel.ack(message);
		});
		
		return data;
	} catch (ex) {
		console.error(ex);
	}
};
