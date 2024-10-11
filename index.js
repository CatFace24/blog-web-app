import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// handling requests
app.get("/design-dump", (req, res) => {
    res.render("index.ejs");
});

app.get("/", (req, res) => {
    res.render("blog-app.ejs");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });