#!/usr/bin/env node
import amqp from "amqplib";
import { runDockerContainer } from "../services/docker/docker.js";
import { filesManager } from "../services/files/filesManager.js";
import { removeFolder } from "../services/files/filesManager.js";
import { insertToDB } from "../services/postgresql/insert.js";
import { createFile } from "../services/files/createFile.js";
import { createDir } from "../services/files/createDir.js";
import { executeCommand } from "../services/docker/executeContainer.js";

const connect = async () => {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");

		const channel = await connection.createChannel();

		var queue = "compiler";

		await channel.assertQueue(queue, {
			durable: true,
		});

		channel.prefetch(1);

		await channel.consume(queue, async (msg) => {
			let path;
			let message = JSON.parse(msg.content.toString());

			const [code = message[0], language = message[1], id = message[2]] =
				message;

			path = await filesManager(createFile, createDir, code, language, id);

			const { res, elapsed } = await runDockerContainer(
				executeCommand,
				path,
				language
			);
			await insertToDB(id, "test", code, res, language, elapsed);
			await removeFolder(path);
			channel.ack(msg);
		});
	} catch (error) {
		console.log(error);
	}
};

connect();
