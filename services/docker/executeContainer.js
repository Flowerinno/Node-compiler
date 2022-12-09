import { exec } from "child_process";
import { promisify } from "util";

const execute = promisify(exec);

export const executeCommand = async (command) => {
	let start = new Date().getTime();
	let res;

	try {
		let { stdout } = await execute(command);
		res = stdout;
		let elapsed = `${(new Date().getTime() - start) / 1000}s`;
		return { res, elapsed };
	} catch (error) {
		res = error.stderr;
		return { res, elapsed: "oh, nevermind..." };
	}
};
