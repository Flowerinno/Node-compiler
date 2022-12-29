export const RequestModel = (sequelize, Sequelize) => {
	const Request = sequelize.define(
		"code_request",
		{
			id: { type: Sequelize.STRING, primaryKey: true },
			status: Sequelize.STRING,
			code: Sequelize.STRING,
			result: Sequelize.STRING,
			language: Sequelize.STRING,
			requested_at: Sequelize.DATE(6),
			compiled_in: Sequelize.STRING,
		},
		{
			timestamps: false,
		}
	);

	return Request;
};
