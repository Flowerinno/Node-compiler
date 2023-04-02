import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { send } from "./rabbitMQ/send.js";
import { v4 as uuidv4 } from "uuid";
import { validation } from "./services/validation/validation.js";
import { select } from "./services/postgresql/controllers/Request.controller.js";
// import { job } from "./services/cron/cron.js";

dotenv.config();
// job.start();

export const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/:id", async (req, res) => {
	const { id } = req.params;
	const response = await select(id);

	const { result, compiled_in } = response;

	if (result && compiled_in) {
		res.json({ result, compiled_in });
	} else {
		res.send("Waiting for server to respond.");
	}
});

app.post("/", async (req, res) => {
	const { code, language } = req.body;

	let id = uuidv4();
	try {
		await validation(code);
		send(code, language, id);
		res.status(200).json({ msg: "Posted successfully", id });
	} catch (error) {
		res.status(404).json({ msg: error.message, id });
	}
});

app.listen(PORT, () => {
	console.log("server is listening on port:", PORT);
});
