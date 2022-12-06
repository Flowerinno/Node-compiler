import fs from "fs";

/**
 * Create directory and file depending on specified language
 * 
 * @param {string} code 
 * @param {string} language 
 * @param {string} id 
 * @returns {string}
 */

export async function createFile(code, language,id) {
	if (!code) {
		console.log("no code provided");
		return;
	}
	
	let codeDir = `H:/code/Node/nodeCompiler-backend/code/${id}`;
	await fs.mkdirSync(codeDir);
	const file =
		language === "javascript" ? `${codeDir}/app.js` : `${codeDir}/index.py`;

	await fs.writeFile(`${file}`, `${code}`, (err) => {
		if (err) throw err;
	});

	return codeDir;
}



export async function removeFolder(path) {
	await fs.rm(path, { recursive: true, force: true }, (err) => {
		if (err) throw err;
	});
	console.log("deleted folder", path);
}
