import fs from "fs";

export const createDir = async (codeDir) => {
	fs.access(codeDir, fs.constants.F_OK, async (err) => {
		if (err) {
			fs.mkdirSync(codeDir);
		} else {
			return;
		}
	});
};
