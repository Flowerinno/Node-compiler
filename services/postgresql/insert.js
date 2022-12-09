import pkg from "pg";
const { Client } = pkg;

const client = new Client({
	host: "127.0.0.1",
	port: 5432,
	user: "dbcompiler",
	password: "dbcompiler",
});

client.connect();

let text =
	"insert into code_request (id,status,code,result,language,compiled_in) values($1, $2, $3, $4, $5, $6);";

export const insertToDB = async (...args) => {
	await client.query(text, [...args]);
};
