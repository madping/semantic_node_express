const express = require("express");
//const path = require("path");
const hd = require("express-handlebars");

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));


app.engine("hbs", hd({
   extname: "hbs",
   defaultLayout: "layouts.hbs",
   partialsDir: "partials" 
}));
 
app.set("view engine","hbs");


app.get("/", (req,res)=>{
   res.render("home", {
      message:"hello"
   });  
});

app.listen(port, (err)=>
{   if(err)return console.log(err);
    console.log(`${port}` + " connected");
});




