// ! OS Module
// OS Module helps to determine whether the current platform supports the specified platform module.
// For example, if you are running on Windows, the platform module is Windows or not.
const os = require("os");

console.log(os.platform()); //win32
console.log(os.arch()); // x64
console.log(os.cpus());
console.log(os.cpus().length + "core");


// Reference:
// 1. https://nodejs.org/api/os.html
// 2. https://www.geeksforgeeks.org/node-js-os/