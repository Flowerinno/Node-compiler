import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createFile } from "./services/files.js";
import { exec } from "child_process";
import {
	runDockerContainer,
	removeContainers,
	createDockerImage,
} from "./services/docker.js";
const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser());
app.use(express.json());

app.get("/", async (req, res) => {
	console.log("get shit");
});

app.post("/", async (req, res) => {
	createFile(req.body.code);

	await createDockerImage();

	let response = await runDockerContainer();
	if (response) {
		console.log(response);
	}

	res.send({ data: response });

	// removeContainers();
});

app.listen(PORT, (req, res) => {
	console.log("server is listening on port", PORT);
});
