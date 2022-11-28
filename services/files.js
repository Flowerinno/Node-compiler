import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export async function createFile(code, language) {
	if (!code) {
		console.log("no code provided");
		return;
	}
	let id = uuidv4();
	let codeDir = `H:/code/Node/nodeCompiler-backend/code/${id}`;
	fs.mkdirSync(codeDir);
	const file =
		language === "javascript" ? `${codeDir}/app.js` : `${codeDir}/index.py`;
	try {
		fs.writeFile(`${file}`, `${code}`, (err) => {
			if (err) throw err;
		});
	} catch (error) {
		console.error(error);
	}
	return codeDir;
}
