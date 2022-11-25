import fs from "fs";

export async function readFile(filePath) {
	try {
		const data = await fs.readFile(filePath);
		console.log(data.toString());
	} catch (error) {
		console.error(error);
	}
}

export async function createFile(data) {
	try {
		await fs.writeFile("index.py", `${data}`, (err) => {
			if (err) throw err;
			console.log("Saved!");
		});
	} catch (error) {
		console.error(error);
	}
}

