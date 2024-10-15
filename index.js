import express from "express";
import bodyParser from "body-parser";
import {v4 as uuidv4} from "uuid";
import methodOverride from "method-override";
uuidv4();

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

// handling GET requests

// This is supposed to be 'home'
app.get("/", (req, res) => {
    const page = "vault";
    const activeTab = "vault"

    res.render("blog-app.ejs", {
        pageTitle : page,
        posts: testPosts,
        activeTab: activeTab
    });
})

app.get("/design-dump", (req, res) => {
    res.render("index.ejs");

});

app.get("/vault", (req, res) => {
    const page = "vault";
    const activeTab = "vault"

    res.render("blog-app.ejs", {
        pageTitle : page,
        posts: testPosts,
        activeTab: activeTab
        });
});

// write new post


app.get("/write", (req, res) => {
    const page = "write";
    const activeTab = "write"

    const titleInput = req.body.title;
    const subtitleInput = req.body.subtitle;
    const contentInput = req.body.content;

    // document.getElementById("title").addEventListener("change", handleTitleChange());


    res.render("blog-app.ejs", {
        pageTitle : page,
        activeTab: activeTab,
        // handleTitleChange : handleTitleChange(),
        // handleSubtitleChange: handleSubtitleChange(),
        // handleContentChange: handleContentChange()
        });
})

// Posts data
let testPosts = [
{
    id: uuidv4(),
    title: "This is a Post Title",
    subtitle: "This is a Post Subtitle.",
    date: new Date("9 Oct 2024").toLocaleDateString(),
    content: "Lorem ipsum dolor sit amet consectetur. Purus feugiat libero congue diam vel lectus. Diam elit sollicitudin nisl fermentum interdum nibh. Nisl viverra eget feugiat dolor leo. Facilisi sit amet non lobortis ultrices faucibus at."
},
{    
    id: uuidv4(),
    title: "This is a Post Title2",
    subtitle: "This is a Post Subtitle2.",
    date: new Date("24 Sept 2024").toLocaleDateString(),
    content: "Lorem ipsum dolor sit amet consectetur. Purus feugiat libero congue diam vel lectus. Diam elit sollicitudin nisl fermentum interdum nibh. Nisl viverra eget feugiat dolor leo. Facilisi sit amet non lobortis ultrices faucibus at."
}
];

app.post("/vault", (req, res) => {
    const page = "vault";
    const activeTab = "vault"

    res.render("blog-app.ejs", {
        pageTitle : page,
        posts: testPosts,
        activeTab: activeTab
        });
});

// View article / post
app.get("/article/:id", (req, res) => {
    const page = "article";
    const activeTab = "vault"
    const { id } = req.params;

    // obtain the right article
    const article = testPosts.filter(c => c.id === id);
        // This returns an array, the selected article is inside the array

    const articleObj = article[0];

    res.render("blog-app.ejs", {
        article: articleObj,
        pageTitle: page,
        activeTab: activeTab
    });

});


// Re-direct to /write post
app.get("/new-post", (req, res) => {
    res.redirect("/write");
});

// Publish new post
app.post("/publish-post", (req, res) => {

    const button = req.body.submit;

    if (button === "Cancel") {
        res.redirect("/vault");
    }
    else {
        var title = req.body.title;
        var subtitle = req.body.subtitle;
        var date = new Date().toLocaleDateString();
        var content = req.body.content;
        var id = uuidv4();

         // push new item into beginning of array
         testPosts.unshift(
            { 
                id: id,
                title: title,
                subtitle: subtitle,
                date: date,
                content: content
            });

        res.redirect("/article/" + id);
    }


       
})

// Delete post
app.delete("/vault/:id", (req, res) => {
    const { id } = req.params;
    testPosts = testPosts.filter(c => c.id !== id);
    res.redirect("/vault");
});


// Edit post
app.post("/edit/:id", (req, res) => {
    const page = "edit";
    const activeTab = "vault"
    
    const { id } = req.params;

    // obtain the right article
    const article = testPosts.filter(c => c.id === id);
        // This returns an array, the selected article is inside the array

    const articleObj = article[0];
    console.log(article[0])

    res.render("blog-app.ejs", {
        pageTitle: page,
        activeTab: activeTab,
        article: articleObj
    })
})

// Update post
app.post("/update/:id", (req, res) => {
    const { id } = req.params;
    const button = req.body.submit;

    if (button === "Cancel") {
        res.redirect("/vault");
    }
    else {
        var newTitle = req.body.title;
        var newSubtitle = req.body.subtitle;
    
        var newContent = req.body.content;

        // find index of post array that matches current article
        var index = testPosts.findIndex(e => e.id === id);

        // change values inside the array
        testPosts[index].title = newTitle;
        testPosts[index].subtitle = newSubtitle;
        testPosts[index].content = newContent;

        console.log(testPosts[index].title);
        console.log(testPosts[index].subtitle );
        console.log(testPosts[index].content);

        res.redirect("/article/" + id);
    }
 
})



// handling other tabs
app.post("/home", (req, res) => {
    const page = "home";
    const activeTab = "home"

    res.render("blog-app.ejs", {
        pageTitle : page,
        activeTab: activeTab
    });
});

app.post("/notifications", (req, res) => {
    const page = "notifications";
    const activeTab = "notifications"

    res.render("blog-app.ejs", {
        pageTitle : page,
        activeTab: activeTab
    });
});

app.post("/bookmarks", (req, res) => {
    const page = "bookmarks";
    const activeTab = "bookmarks"

    res.render("blog-app.ejs", {
        pageTitle : page,
        activeTab: activeTab
    });
});


app.post("/write", (req, res) => {
    const page = "write";
    const activeTab = "write"

    res.render("blog-app.ejs", {
        pageTitle : page,
        activeTab: activeTab,
        // handleTitleChange : handleTitleChange(),
        // handleSubtitleChange: handleSubtitleChange(),
        // handleContentChange: handleContentChange()
    });
});

app.post("/settings", (req, res) => {
    const page = "settings"
    const activeTab = "vault"

    res.render("blog-app.ejs", {
        pageTitle : page,
        activeTab: activeTab
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });