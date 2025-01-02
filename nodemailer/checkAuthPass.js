const nodemailer = require("nodemailer");

nodemailer.createTestAccount((err, account) => {
  if (err) {
    console.error("Failed to create a testing account. ", err);
    return;
  }

  console.log("Ethereal Account Created Successfully!");
  console.log("User:", account.user);
  console.log("Password:", account.pass);
});
