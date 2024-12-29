// fs module:
// It helps us to work with the filesystem.
// that means creating, deleting, and updating.

const fs = require("fs");

// ! create files
// ? Example 1:
// create a file myCode.txt
/*
fs.writeFile("myCode.txt", "Hello world!", (err, data) => {
  if (err) throw err;
  console.log("File created!");
});
*/

// create a file myCode2.txt
/*
fs.writeFile("myCode2.txt", "Hello world!", (err, data) => {
  if (err) throw err;
  console.log("File created!");
});
*/

// appendFile will add the data to existing content.
/*
fs.appendFile("myCode.txt", "Hello Developers Let's Code", (err, data) => {
  if (err) throw err;
  console.log("Data appended!");
});
*/

// ! read files
//? Example 1:
/*
fs.readFile("myCode.txt", function (err, data) {
  if (err) throw err;

  console.log(data);
});
*/
// Here the data will return as Buffer object.
// The default stream is Buffer.

//? Example 2:
/*
fs.readFile("myCode.txt", "utf-8", (err, data) => {
  if (err) throw err;

  console.log(data);
});
*/

// Now the data wil return in utf-8 format.

// Reference:
// 1. https://www.geeksforgeeks.org/node-js-file-system/
// 2. https://nodejs.org/api/fs.html
