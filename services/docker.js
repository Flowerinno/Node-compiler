import { exec } from "child_process";

export function createDockerImage() {
	exec("docker image build -t python:0.0.1 .", (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			return;
		}
	});
	console.log(`image completed`);
}

export function runDockerContainer() {
	let data;
	console.log("start docker container");
	exec("docker run python:0.0.1", (error, stdout, stderr) => {
		if (error) {
			console.log(error);
		}

		data = stdout;
	});
	exec("docker run --rm python:0.0.1");
	return data;
}

export async function removeContainers() {
	await exec("docker stop $(docker ps -a -q)");
	await exec("docker rm $(docker ps -a -q)", (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
	});
	console.log(`Containers has been removed: ${stdout}`);
}
