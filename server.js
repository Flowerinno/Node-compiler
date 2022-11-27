import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createFile } from "./services/files.js";
import {
	runPythonDockerContainer,
	runJavascriptDockerContainer,
} from "./services/docker.js";
const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser());
app.use(express.json());

let response;
app.post("/", async (req, res) => {
	const { code, language } = req.body;

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
	res.send(response);
});

app.listen(PORT, (req, res) => {
	console.log("server is listening on port", PORT);
});
