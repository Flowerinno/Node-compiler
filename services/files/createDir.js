import fs from "fs";

export const createDir = (codeDir) => {
	fs.mkdirSync(codeDir);
};
