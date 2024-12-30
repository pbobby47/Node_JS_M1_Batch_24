const http = require("http");

// Create Sever
const server = http.createServer((req, res) => {
  res.write("<h1>This is Node JS Server</h1>");
  res.end();
});

// req is a request object that we sent to the server.(Ex: params , query , body, etc).
// res is a response object that sever send in return.

server.listen(8000, () => {
  console.log("Server has started");
});
