import { promisify } from "util";
import { exec } from "child_process";
import fs from "fs";

const execute = promisify(exec);

export async function createPythonDockerImage() {
	await exec(
		"docker image build -t python:latest ./python",
		(error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				return;
			}
			console.log(`python image has been created successfully`);
		}
	);
}

export async function createJavascriptDockerImage() {
	await exec(
		"docker image build -t javascript:latest ./javascript",
		(error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				return;
			}
			console.log("javascript image has been created successfully");
		}
	);
}

export async function runPythonDockerContainer(path) {
	const { stdout } = await execute(
		`docker run --rm -v ${path}:/code -w /code python:latest`
	);
	fs.rm(path, { recursive: true, force: true }, (err) => {
		if (err) throw err;
	});
	return stdout;
}

export async function runJavascriptDockerContainer(path) {
	console.log("start javascript container");
	try {
		const { stdout } = await execute(
			`docker run --stop-timeout --rm -v  ${path}:/code -w /code javascript:latest`
		);
		fs.rm(path, { recursive: true, force: true }, (err) => {
			if (err) throw err;
		});
		if (!stdout) {
			return "Exited with code 140 - exceed the run time limit.";
		}
		return stdout;
	} catch (err) {
		return "Error occured while running your code...";
	}
}
