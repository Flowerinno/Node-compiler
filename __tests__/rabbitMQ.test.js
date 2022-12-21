// import { send } from "../rabbitMQ/send.js";
// import amqp from "amqplib/callback_api.js";


// describe("should send messages to queue and return via consumer", () => {
// 	it("should send messages to queue", () => {
// 		let rabbit = amqp.connect("amqp://localhost:5672");
// 		send('console.log("abc")', "javascript", "someID");
// 		rabbit.createChannel((err, channel) => {
// 			channel.assertQueue("compiler", { durable: true }, (err, ok) => {
// 				expect(ok.messageCount).toEqual(1);
// 			});
// 		});
// 	});
// });
