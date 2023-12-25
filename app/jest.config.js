module.exports = {
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(js|jsx)$": "babel-jest",
	},
	moduleFileExtensions: ["jsx", "js"],
	moduleNameMapper: {
		"\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
		"\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
	},
	globals: {
		"ts-jest": {
			isolatedModules: true,
		},
	},
};
