export const validation = (code) => {
	if (!code) {
		return Promise.reject(new Error('No code provided.'));
	}
};
