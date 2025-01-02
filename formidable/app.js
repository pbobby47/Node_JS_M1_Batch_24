const express = require("express");
const formidable = require("formidable");
const fs = require("fs");

const app = express();
const port = 8000;

// static file path
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send(`
            <form action="/profile" method="post" enctype="multipart/form-data">
              <div>
                <label>Name : </label>
                <input type="text" name="imageName" />
              </div>

              <div>
                <label>File : </label>
                <input type="file" name="fileName" />
              </div>

              <button>Submit</button>
            </form>
        `);
});

app.post("/profile", (req, res) => {
  let form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    let oldpath = files.fileName.filepath;
    let newpath = `${__dirname}/public/images/${files.fileName.originalFilename}`;

    console.log(oldpath);
    console.log(newpath);

    fs.rename(oldpath, newpath, err => {
      if (err) {
        console.error("Error moving file:", err);
        return res.status(500).send("File upload failed");
      }
      res.send("File uploaded successfully");
    });
  });
});

app.listen(port, () => {
  console.log("Server has started on " + port);
});
