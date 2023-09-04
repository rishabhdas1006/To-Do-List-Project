import express from "express";
import bodyParser from "body-parser";
import favicon from "serve-favicon";
import path from "path";

const port = 3000;
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

var headings = [];
var bodies = [];
var time = [];
var done = [];


app.get("/", (req, res) => {
    headings = [];
    bodies = [];
    time = [];
    done = [];
    res.render("index.ejs", {
        noteHeadings: headings,
        noteBodies: bodies,
        noteTime: time,
        noteDone: done
    });
});

app.get("/submit", (req, res) => {
    // console.log("OK");
    res.render("index.ejs", {
        noteHeadings: headings,
        noteBodies: bodies,
        noteTime: time,
        noteDone: done
    });
});

app.post("/submit", (req, res) => {
    if(req.body.title === "" && req.body.body === ""){
        console.log("update");
    }
    else{
        headings.push(req.body.title);
        bodies.push(req.body.body);
        var date = new Date();
        time.push(date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + ", " + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear());
        done.push(0);
    }
    if(typeof(req.body.marker) === "object"){
        for(let i = 0; i<req.body.marker.length; i++){
            done[req.body.marker[i]] = 1;
        }
    }
    else if(typeof(req.body.marker) === "string"){
        done[(Number)(req.body.marker)] = 1;
    }
    // console.log(req.body);
    res.redirect("/submit");
});

app.get("/features", (req, res) => {
    res.render("features.ejs");
});

app.get("/pricing", (req, res) => {
    res.render("pricing.ejs");
});

app.get("/faq", (req, res) => {
    res.render("faq.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})