import { dbConfig } from "./db.config.js";
import { Sequelize } from "sequelize";
import { RequestModel } from "./models/request.model.js";

const {
	db,
	host,
	password,
	user,
} = dbConfig;

const sequelize = new Sequelize(db, user, password, {
	host,
	dialect: "postgres",
});

export const DB = {};

DB.Sequelize = Sequelize;
DB.sequelize = sequelize;

DB.request = RequestModel(sequelize, Sequelize);

sequelize.sync();