import { promisify } from "util";
import { exec } from "child_process";
import fs from "fs";
import { removeFolder } from "./files.js";
const execute = promisify(exec);
// "docker image build -t python:latest ./python"
// "docker image build -t javascript:latest ./javascript",

export async function runPythonDockerContainer(path) {
	let data;
	console.log("running python docker container");
	try {
		const { stdout } = await execute(
			`docker run --rm -v ${path}:/code -w /code python:latest`
		);

		removeFolder(path);

		data = stdout;
	} catch (err) {
		return err.stderr;
	}
	console.log(data);
}

export async function runJavascriptDockerContainer(path) {
	console.log("javascript docker container");
	try {
		const { stdout } = await execute(
			`docker run  -v  ${path}:/code -w /code javascript:latest`
		);

		removeFolder(path);

		console.log(stdout);

		return stdout;
	} catch (err) {
		return err.stderr;
	}
}
