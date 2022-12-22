import request from "supertest";
import express from "express";
import { validation } from "../services/validation/validation";

const app = express();

app.get("/:id", (req, res) => {
	let id = "5";
	let result = "success";
	let elapsed = "1";
	if (req.params !== id) {
		res.json({ message: "Invalid identifier" });
	}
	res.status(200).json({ result, elapsed });
});

app.post("/", async (req, res) => {
	let id = "10";
	const { code, language } = req.params;
	try {
		await validation(code);
		res.status(200).json({ msg: "success", id });
	} catch (err) {
		res.status(404).json({ msg: "error" });
	}
});

describe("Routing", () => {
	describe("GET route", () => {
		it("should provide successfull results from get request", () => {
			request(app)
				.get("/5")
				.expect("Content-Type", /json/)
				.expect(200)
				.end((err) => {
					if (err) throw err;
				});
		});
		it("should return error if id is not found", () => {
			const result = request(app)
				.get("/3")
				.end(() => {});
			expect(result.data).not.toBeDefined();
		});
	});
	describe("POST route", () => {
		it("should return 200 code on success", () => {
			request(app)
				.post("/")
				.send({ code: "code", language: "javascript" })
				.expect(200)
				.end(() => {});
		});

		it("should return 404 if no code provided", () => {
			request(app)
				.post("/")
				.expect(404)
				.end(() => {});
		});
	});
});
