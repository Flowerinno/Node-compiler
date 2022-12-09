import pkg from "pg";

const { Client } = pkg;

const client = new Client({
	host: "127.0.0.1",
	port: 5432,
	user: "dbcompiler",
	password: "dbcompiler",
});

client.connect();

export const select = async (id) => {
	const result = await client.query(
		"select result, compiled_in from code_request where id = $1;",
		[id]
	);
	return result;
};
