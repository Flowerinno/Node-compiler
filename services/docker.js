import { promisify } from "util";
import { exec } from "child_process";
import fs from "fs";

const execute = promisify(exec);
// "docker image build -t python:latest ./python"
// "docker image build -t javascript:latest ./javascript",

export async function runPythonDockerContainer(path) {
	try {
		const { error, stdout, stderr } = await execute(
			`docker run --rm -v ${path}:/code -w /code python:latest`
		);
		fs.rm(path, { recursive: true, force: true }, (err) => {
			if (err) throw err;
		});

		return stdout;
	} catch (err) {
		return err.stderr;
	}
}

export async function runJavascriptDockerContainer(path) {
	try {
		const { error, stdout, stderr } = await execute(
			`docker run --rm -v  ${path}:/code -w /code javascript:latest`
		);
		fs.rm(path, { recursive: true, force: true }, (err) => {
			if (err) throw err;
		});

		return stdout;
	} catch (err) {
		return err.stderr;
	}
}
