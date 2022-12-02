import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createFile } from "./services/files.js";
import {
	runPythonDockerContainer,
	runJavascriptDockerContainer,
} from "./services/docker.js";
import { send } from "./rabbitMQ/send.js";
import { consumer } from "./rabbitMQ/consumer.js";
const app = express();
const PORT = 8000;

app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());
app.use(express.json());
let response;
app.get("/", async (req, res) => {
	let data = await consumer();

	if (data) {
		let code = data[0];
		let language = data[1];

		switch (language) {
			case "javascript": {
				let path = await createFile(code, language);
				response = await runJavascriptDockerContainer(path);
				break;
			}
			case "python": {
				let path = await createFile(code, language);
				response = await runPythonDockerContainer(path);

				break;
			}
			default:
				console.log("no language specified");
		}
		if (response) {
			res.status(200).json({ data: response });
		}
	} else {
		res.status(404).json({ msg: "Not Found" });
	}
});

app.post("/", async (req, res) => {
	const { code, language } = req.body;
	try {
		send(code, language);
		res.status(200).json({ msg: "Posted successfully" });
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
});

app.listen(PORT, (req, res) => {
	console.log("server is listening on port", PORT);
});
