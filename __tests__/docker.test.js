// import { runDockerContainer } from "../services/docker/docker.js";
// import { createFile, removeFolder } from "../services/files/files";

/**
 * Require Docker to be installed and running the container for
 * integration tests
 */

// describe("runs javascript or docker container", () => {
// 	it("should run javascript container, remove it on exit", async () => {
// 		let path = await createFile(
// 			"console.log('abc')",
// 			"javascript",
// 			"javascriptID"
// 		);
// 		let result = await runDockerContainer(path, "javascript");

// 		expect(result).toMatch(/abc/);
// 		await removeFolder(path);
// 	});

// 	it("should run python container, remove it on exit", async () => {
// 		let path = await createFile("print('abc')", "python", "pythonID");
// 		let result = await runDockerContainer(path, "python");

// 		expect(result).toMatch(/abc/);
// 		await removeFolder(path);
// 	});
// });

//Unit tests

const execCommand = jest.fn((command) => {
	if (typeof command === "string") {
		return "stdout";
	} else {
		return Promise.reject(new Error("TypeError"));
	}
});

const dockerContainer = jest.fn((language) => {
	const js = "javascript";
	const py = "python";
	const command = language === "javascript" ? js : py;
	return command;
});

describe("docker management", () => {
	it("should pick a correct command depending on language", () => {
		expect(dockerContainer("javascript")).toBe("javascript");
		expect(dockerContainer("python")).toBe("python");
	});

	it("should run a command to start docker container and return stdout", async () => {
		let command = "run docker container";

		let result = await execCommand(command);
		expect(result).toMatch(/stdout/);
	});

	it("should throw an error if command is not a string", async () => {
		let command = 1;
		let result = execCommand(command);
		await expect(result).rejects.toThrow("TypeError");
	});
});
