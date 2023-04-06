module.exports = {
	apps: [
		{
			name: "server",
			script: "server.js",
		},
		{
			name: "consumer",
			script: "./rabbitmq/consumer.mjs",
		},
	],
};
