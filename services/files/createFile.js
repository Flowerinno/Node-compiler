import fs from "fs";

export const createFile = async (language, codeDir, code) => {
	const file =
		language === "javascript" ? `${codeDir}/app.js` : `${codeDir}/index.py`;

	fs.access(codeDir, fs.constants.F_OK, async (err) => {
		if (err) {
			await fs.writeFile(`${file}`, `${code}`, (err) => {
				if (err) throw err;
			});
		} else {
			return;
		}
	});
};
