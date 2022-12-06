#!/usr/bin/env node
import amqp from "amqplib";
import { runDockerContainer } from "../services/docker.js";
import { createFile } from "../services/files.js";
import pkg from "pg";
import { removeFolder } from "../services/files.js";
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

			const [code = message[0], language = message[1], id = message[2]] =
				message;

			console.log(message);

			let path;

			try {
				path = await createFile(code, language, id);

				const containerRes = await runDockerContainer(path, language);

				await client.query(text, [id, "test", code, containerRes, language]);
			} catch (err) {
				await client.query(text, [id, "test", code, err.stderr, language]);
			}
			await removeFolder(path);
			channel.ack(msg);
		});
	} catch (error) {
		console.log(error);
	}
};

connect();
