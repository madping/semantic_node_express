const express = require("express");
const hd = require("express-handlebars");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

//const words = require("./db/words.json");
//console.log(words);
//console.log(typeof(words));


 const readDir = path.resolve(__dirname, "db");
 const ww = fs.readFileSync(path.join(readDir, "words.json"), {encoding: "utf-8"});
 let words = JSON.parse(ww);

 //console.log(typeof(han));


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.engine("hbs", hd({
   extname: "hbs",
   defaultLayout: "layouts.hbs",
   partialsDir: "partials" 
}));
 
app.set("view engine","hbs");


app.get("/", (req,res)=>{
   res.render("home", {
     // message:"hello"
     words:words
   });  
});


app.post("/", (req,res)=>{
   const {query} = req.body;
   res.render("home", {
    words: words.filter((w)=>
      w.word.toLowerCase().includes(query.toLowerCase())
    )
   });
});


app.delete("/", (req,res)=>{
   let {word} = req.body;
   words = words.filter(w => !(w.word===word));
});


app.get("/add", (req,res)=>{
   res.render("add");
});


app.get("/quiz", (req,res)=>{
   res.render("quiz");
});


app.use((req,res)=>{
   res.render("404");
});


app.listen(port, (err)=>
{   if(err)return console.log(err);
    console.log(`${port}` + " connected");
});




