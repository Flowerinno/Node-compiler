import fs from "fs";
import { createDir } from "./createDir.js";
import { createFile } from "./createFile.js";

export async function filesManager(code, language, id) {
	let codeDir = `H:/code/Node/nodeCompiler-backend/code/${id}`;
	await createDir(codeDir);
	
	await createFile(language, codeDir, code);
	
	console.log(codeDir);
	return codeDir;
}

export async function removeFolder(path) {
	await fs.rm(path, { recursive: true, force: true }, (err) => {
		if (err) throw err;
	});
	console.log("deleted folder", path);
}
