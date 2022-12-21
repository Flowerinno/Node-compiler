import { validation } from "../services/validation/validation";

describe("validation", () => {
	it("should throw error if no code is provided", () => {
		let code = "";
		let result = validation(code);
		expect(result).rejects.toMatch("No code provided.");
	});
});
