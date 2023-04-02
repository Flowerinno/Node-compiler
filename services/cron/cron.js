import { CronJob } from "cron";
//run code at 4:00 on Mondays
import { selectAll } from "../postgresql/controllers/Request.controller.js";
import { uploadPostgresData } from "../AWS/aws.js";

// export const job = new CronJob(
// 	"0 4 * * 1",
// 	async () => {
// 		const data = await selectAll();
// 		uploadPostgresData(data);
// 	},
// 	null,
// 	false,
// 	"America/Los_Angeles"
// );
