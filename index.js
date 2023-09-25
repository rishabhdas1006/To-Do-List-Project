import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import favicon from "serve-favicon";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname=dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

var headings = [];
var bodies = [];
var time = [];
var done = [];


app.get("/", (req, res) => {
    console.log("New session started");
    headings = [];
    bodies = [];
    time = [];
    done = [];
    var page = "home";
    res.render("index.ejs", {
        noteHeadings: headings,
        noteBodies: bodies,
        noteTime: time,
        noteDone: done,
        notePage: page
    });
});

app.get("/submit", (req, res) => {
    // console.log("OK");
    var page = "home";
    res.render("index.ejs", {
        noteHeadings: headings,
        noteBodies: bodies,
        noteTime: time,
        noteDone: done,
        notePage: page
    });
});

app.post("/submit", (req, res) => {
    if(req.body.title === "" && req.body.body === ""){
        console.log("Updated tasks");
    }
    else{
        headings.push(req.body.title);
        bodies.push(req.body.body);
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var meridian = "AM";

        // Adjust UTC to ITC
        hours = (hours + 5) % 24 + (minutes >= 30 ? 1 : 0);
        minutes = (minutes + 30) % 60;

        // Adjust 12 AM / PM
        if(hours >= 12){
            hours -= 12;
            meridian = "PM";
        }
        if(hours === 0){
            hours = 12;
        }

        time.push(hours + ":" + (minutes<10?'0':'') + minutes + " " + meridian);
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
    var page = "home";
    res.redirect("/submit");
});

app.get("/features", (req, res) => {
    var page = "features";
    res.render("features.ejs", {
        notePage: page
    });
});

app.get("/pricing", (req, res) => {
    var page = "pricing";
    res.render("pricing.ejs", {
        notePage: page
    });
});

app.get("/faq", (req, res) => {
    var page = "faq";
    res.render("faq.ejs", {
        notePage: page
    });
});

app.get("/about", (req, res) => {
    var page = "about";
    res.render("about.ejs", {
        notePage: page
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})