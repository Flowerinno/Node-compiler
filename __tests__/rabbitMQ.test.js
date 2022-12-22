const send = jest.fn((code, language, id) => {
	let queue = [];
	queue.push(code, language, id);
	return queue;
});

const consumer = jest.fn(() => {
	return ["console.log(1)", "javascript", "10"];
});
describe("rabbitMQ", () => {
	it("should send messages to queue", () => {
		const result = send("console.log(1)", "javascript", "10");
		expect(send).toBeCalledTimes(1);
		expect(result).toBeDefined();
		expect(result.length).toBe(3);
	});

	it("should get data via consumer from queue", () => {
		const message = consumer();
		expect(consumer).toBeCalledTimes(1);
		expect(message).toBeDefined();
		expect(message).toMatchSnapshot();
	});
});

// describe('should ')
