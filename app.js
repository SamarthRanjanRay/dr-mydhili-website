const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine','ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login",(req,res)=>{
    console.log(req.body)    
})

app.listen(3000,()=>{
    console.log("Server running at port 3000");
})
