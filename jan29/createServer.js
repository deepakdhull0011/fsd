const http = require("http");

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("Welcome to Node.js tutorial");
	});
	server.listen(3000, () => {
		console.log(
			"Server is running on localhost:3000");
	});
