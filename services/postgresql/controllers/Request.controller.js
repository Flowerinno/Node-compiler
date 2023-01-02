import { DB } from "../orm.js";

const Request = DB.request;

export const insert = async (req) => {
	const request = {
		id: req.id,
		status: req.status,
		code: req.code,
		result: req.res,
		language: req.language,
		compiled_in: req.elapsed,
	};
	try {
		await Request.create(request);
		console.log("successfully created");
	} catch (err) {
		console.error(err);
	}
};

export const select = async (id) => {
	try {
		const result = await Request.findByPk(id);

		return result.dataValues;
	} catch (error) {
		console.error(error);
	}
};

export const selectAll = async () => {
	try {
		const result = await Request.findAll();
		return JSON.stringify(result);
	} catch (error) {
		console.error(error);
	}
};
