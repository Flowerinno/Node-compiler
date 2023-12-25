import fs from "fs";
// import { createDir } from "./createDir.js";
// import { createFile } from "./createFile.js";

export async function filesManager(createFile, createDir, code, language, id) {
	let codeDir = `${process.cwd()}/code/${id}`;

	await createDir(codeDir);

	await createFile(language, codeDir, code);

	return codeDir;
}

export async function removeFolder(path) {
	await fs.rm(path, { recursive: true, force: true }, (err) => {
		if (err) throw err;
	});
}
