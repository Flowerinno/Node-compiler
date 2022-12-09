import { createFile, removeFolder } from "../services/files";
import { getDirectories } from "../__mocks__/files.mocks";
import fs from "fs";

let codePath = "H:/code/Node/nodeCompiler-backend/code";
describe("creates and removes folders", () => {
	
	it("should create a folder and file inside (.js/.py) with uuid, and then remove it from the folder", async () => {
		const path = await createFile("console.log(1)", "javascript", "someID");
		expect(getDirectories(codePath)[0]).toEqual("someID");
		await removeFolder(path);
		setTimeout(() => {
			expect(getDirectories(codePath).length).toBe(0);
		}, 100);
	});
});
