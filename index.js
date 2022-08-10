const fs = require("fs");
const http = require("http");
const url = require("url");

/////////////////////////////////
//// FILES

//blocking synchronus way
//
//
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn} \nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Written");

//non-blocking way async way
//
//
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
// 	fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
// 		if (err) return console.log("error occured", err);
// 		console.log(data2);

// 		fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
// 			if (err) return console.log("error occured", err);
// 			console.log(data3);

// 			fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", err => {
// 				if (err) return console.log("error occured", err);
// 				console.log("Your file was written");
// 			});
// 		});
// 	});
// });
// console.log("Will read the file\n.\n.");

/////////////////////////////////
//// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
	const pathName = req.url;

	switch (pathName) {
		case "/":
		case "/overview":
			res.end("this is overview");
			break;
		case "/product":
			res.end("this is product");
			break;
		case "/api":
			res.writeHead(200, {
				"Content-type": "application/json"
			});
			res.end(data);
			break;
		default:
			res.writeHead(404, {
				"Content-type": "text/html",
				"my-own-header": "hello-world"
			});
			res.end("<h1>Page not found</h1>");
	}
});

server.listen(8000, "127.0.0.1", () => console.log("listening to requests on port 8000"));
