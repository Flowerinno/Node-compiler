export const validation = (code) => {
	if (!code) {
		return Promise.reject("No code provided.");
	}
};
