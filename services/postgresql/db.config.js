import dotenv from "dotenv";
dotenv.config();

export const dbConfig = {
	host: process.env.HOST_DB,
	port: process.env.PORT_DB,
	user: process.env.USER_DB,
	db: process.env.DB,
	password: process.env.PASSWORD_DB,
	dialect: process.env.DIALECT,
	pool: {
		max: process.env.MAX,
		min: process.env.MIN,
		acquire: process.env.ACQUIRE,
		idle: process.env.IDLE,
	},
};
