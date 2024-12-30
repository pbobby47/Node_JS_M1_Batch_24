const fs = require("fs");
const http = require("http");

// Create a Server

const server = http.createServer((req, res) => {
  // Read the file
  fs.readFile("./city.json", "utf-8", (err, data) => {
    if (err) throw err;

    // return data
    res.write(data);
    res.end();
  });
});

server.listen(8000, () => console.log("Server Has Started"));
