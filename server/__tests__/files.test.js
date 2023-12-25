import { createDir } from "../services/files/createDir";
import { createFile } from "../services/files/createFile";
import { removeFolder } from "../services/files/filesManager";
import { vol, fs } from "memfs";

const createdir = jest.fn((path) => {
	fs.mkdirSync(path);
});

const createfile = jest.fn(() => {
	fs.writeFileSync("code/test/app.js", "Hello world!");
});

const removefolder = jest.fn(() => {
	fs.rmdirSync("code/test");
});

const structure = () => {
	return vol.fromJSON(
		{
			test: {},
		},
		"code"
	);
};

describe("files management", () => {
	beforeEach(() => {
		vol.reset();
	});

	afterAll(() => {
		vol.reset();
	});

	it(createDir, () => {
		structure();
		createdir("code/test/uuid");
		expect(createdir).toBeCalledTimes(1);
		expect(fs.existsSync("code/test/uuid")).toBe(true);
	});

	it(createFile, async () => {
		structure();
		createfile();
		expect(createfile).toBeCalledTimes(1);
		expect(fs.existsSync(`code/test/app.js`)).toBe(true);
		expect(fs.readFileSync("code/test/app.js", "utf8")).toEqual("Hello world!");
	});

	it(removeFolder, async () => {
		structure();
		removefolder();
		expect(removefolder).toBeCalledTimes(1);
		expect(fs.existsSync("code/test")).toBe(false);
	});
});
