import { exec } from "child_process";
import { promisify } from "util";
import { removeFolder } from "./files.js";

const execute = promisify(exec);

// "docker image build -t python:latest ./python"
// "docker image build -t javascript:latest ./javascript",

export async function runPythonDockerContainer(path) {
	let command = `docker run --rm -v ${path}:/code -w /code javascript:latest`;
	const { err, stdout, stderr } = await execute(command);
	if (err) {
		return err;
	}
	if (stderr) {
		return stderr;
	}
	return stdout;
}

export async function runJavascriptDockerContainer(path) {
	let command = `docker run --rm -v ${path}:/code -w /code javascript:latest`;
	const { err, stdout, stderr } = await execute(command);
	await removeFolder(path);
	if (err) {
		return err;
	}
	if (stderr) {
		return stderr;
	}
	return stdout;
}
