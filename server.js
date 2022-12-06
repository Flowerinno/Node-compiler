import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { send } from "./rabbitMQ/send.js";
import { v4 as uuidv4 } from "uuid";
import pkg from "pg";
const { Client } = pkg;

const client = new Client({
	host: "127.0.0.1",
	port: 5432,
	user: "dbcompiler",
	password: "dbcompiler",
});

client.connect();
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

let start;
let elapsed;
app.get("/:id", async (req, res) => {
	const { id } = req.params;
	elapsed = `${(new Date().getTime() - start) / 1000}s`;
	const result = await client.query(
		"select result from code_request where id = $1;",
		[id]
	);

	if (result.rows !== []) {
		res.json({ result: result.rows, elapsed });
	} else {
		res.send("Waiting for server to respond.");
	}
});

app.post("/", async (req, res) => {
	start = new Date().getTime();
	const { code, language } = req.body;
	let id = uuidv4();
	try {
		send(code, language, id);
		res.status(200).json({ msg: "Posted successfully", id });
	} catch (error) {
		res.status(404).json({ msg: error.message, id });
	}
});

app.listen(PORT, (req, res) => {
	console.log("server is listening on port:", PORT);
});
