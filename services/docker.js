import { exec } from "child_process";
import { promisify } from "util";

const execute = promisify(exec);

// "docker image build -t python:latest ./python"
// "docker image build -t javascript:latest ./javascript",

/**
 * Run javascript or python docker container
 *
 * @param {string} path
 * @param {string} language
 * @returns string
 */

export const runDockerContainer = async (path, language) => {
	const js = `docker run --rm -v ${path}:/code -w /code javascript:latest`;
	const py = `docker run --rm -v ${path}:/code -w /code python:latest`;
	const command = language === "javascript" ? js : py;

	const { err, stdout, stderr } = await execute(command);

	if (err) {
		return err;
	}
	if (stderr) {
		return stderr;
	}
	return stdout;
};
