#!/usr/bin/env node
import amqp from "amqplib";
import { runJavascriptDockerContainer } from "../services/docker.js";
import { createFile } from "../services/files.js";
import pkg from "pg";
const { Client } = pkg;

const client = new Client({
	host: "127.0.0.1",
	port: 5432,
	user: "dbcompiler",
	password: "dbcompiler",
});
client.connect();
let text =
	"insert into code_request (id,status,code,result,language) values($1, $2, $3, $4, $5);";

const connect = async () => {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");

		const channel = await connection.createChannel();

		var queue = "compiler";

		await channel.assertQueue(queue, {
			durable: true,
		});

		channel.prefetch(1);
		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
		await channel.consume(queue, async (msg) => {
			let message = JSON.parse(msg.content.toString());

			console.log(message);
			try {
				const path = await createFile(message[0], message[1], message[2]);
				const containerRes = await runJavascriptDockerContainer(path);
				const response = await client.query(text, [
					message[2],
					"test",
					message[0],
					containerRes,
					message[1],
				]);
			} catch (err) {
				const response = await client.query(text, [
					message[2],
					"test",
					message[0],
					err.stderr,
					message[1],
				]);
			}
			channel.ack(msg);
		});
	} catch (error) {
		console.log(error);
	}
};

connect();
