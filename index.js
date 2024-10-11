import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));


// handling requests
app.get("/", (req, res) => {
    const page = "home";
    res.render("blog-app.ejs", {
        pageTitle : page
    });
})

app.get("/design-dump", (req, res) => {
    res.render("index.ejs");

});

// posting for tabs

app.post("/home", (req, res) => {
    const page = "home";
    res.render("blog-app.ejs", {
        pageTitle : page
    });
});

app.post("/notifications", (req, res) => {
    const page = "notifications";
    res.render("blog-app.ejs", {
        pageTitle : page
    });
});

app.post("/bookmarks", (req, res) => {
    const page = "bookmarks";
    res.render("blog-app.ejs", {
        pageTitle : page
    });
});

app.post("/vault", (req, res) => {
    const page = "vault";
    res.render("blog-app.ejs", {
        pageTitle : page
        });
});

app.post("/write", (req, res) => {
    const page = "write";
    res.render("blog-app.ejs", {
        pageTitle : page
    });
});

app.post("/settings", (req, res) => {
    const page = "settings"
    res.render("blog-app.ejs", {
        pageTitle : page
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });