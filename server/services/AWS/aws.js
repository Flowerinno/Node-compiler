import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

export const uploadPostgresData = (data) => {
	const params = {
		Bucket: "nodecompiler",
		Key: new Date().toString(),
		Body: data,
	};
	s3.upload(params, (err, data) => {
		if (err) {
			console.log(err);
		}
		if (data) {
			console.log("uploaded in:", data.Location);
		}
	});
};
