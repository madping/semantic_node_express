const express = require("express");
const hd = require("express-handlebars");

const app = express();
const port = 3000;

const words = require("./db/words.json");
//console.log(words);
//console.log(typeof(words));

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
     words
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




