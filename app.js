const express = require("express");
const hd = require("express-handlebars");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

//const words = require("./db/words.json");
//console.log(words);
//console.log(typeof(words));


 const readDir = path.resolve(__dirname, "db");
 const words = fs.readFileSync(path.join(readDir, "words.json"), {encoding: "utf-8"});
 const han = JSON.parse(words);

 console.log(typeof(han));






app.use(express.static(__dirname + "/public"));


app.engine("hbs", hd({
   extname: "hbs",
   defaultLayout: "layouts.hbs",
   partialsDir: "partials" 
}));
 
app.set("view engine","hbs");


app.get("/", (req,res)=>{
   res.render("home", {
     // message:"hello"
     words:han
   });  
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




