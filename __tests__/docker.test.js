import { runDockerContainer } from "../services/docker/docker.js";
import { createFile, removeFolder } from "../services/files/files";

/**
 * Require Docker to be installed and running the container
 */

describe("runs javascript or docker container", () => {
	it("should run javascript container, remove it on exit", async () => {
		let path = await createFile(
			"console.log('abc')",
			"javascript",
			"javascriptID"
		);
		let result = await runDockerContainer(path, "javascript");

		expect(result).toMatch(/abc/);
		await removeFolder(path);
	});
	
	it("should run python container, remove it on exit", async () => {
		let path = await createFile("print('abc')", "python", "pythonID");
		let result = await runDockerContainer(path, "python");

		expect(result).toMatch(/abc/);
		await removeFolder(path);
	});
});
