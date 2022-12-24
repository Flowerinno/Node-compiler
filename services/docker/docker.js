// "docker image build -t python:latest ./python"
// "docker image build -t javascript:latest ./javascript",

export const runDockerContainer = async (executeCommand, path, language) => {
	const js = `docker run --rm -v ${path}:/code -w /code javascript:latest`;
	const py = `docker run --rm -v ${path}:/code -w /code python:latest`;
	const command = language === "javascript" ? js : py;

	return await executeCommand(command);
};
