import express from "express";
import cors from "cors";
import { send } from "./rabbitMQ/send.js";
import { v4 as uuidv4 } from "uuid";
import { validation } from "./services/validation/validation.js";
import { select } from "./services/postgresql/select.js";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get("/:id", async (req, res) => {
	const { id } = req.params;
	const result = await select(id);
	const { rows, elapsed } = result;

	if (result.rows.length >= 1) {
		res.json({ rows, elapsed });
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

app.listen(PORT, (req, res) => {
	console.log("server is listening on port:", PORT);
});
