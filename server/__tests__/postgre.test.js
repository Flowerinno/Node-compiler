const selectDataFromDB = jest.fn((id) => {
	if (id === "1") {
		return { result: "success", compiled_in: 1 };
	} else {
		return "Invalid indentifier";
	}
});

const expected = { result: "success", compiled_in: 1 };

describe("postgreSQL", () => {
	it("selects data from postgre database with correct ID provided", async () => {
		const result = await selectDataFromDB("1");
		expect(result).toStrictEqual(expected);
	});

	it("return Invalid Identifier if ID is invalid", async () => {
		const result = await selectDataFromDB("2");
		expect(result).toBe("Invalid indentifier");
	});
});
