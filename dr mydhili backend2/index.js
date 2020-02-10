var express=require("express");
var mongoose=require("mongoose");
var bodyparser=require("body-parser");
var methodoverride=require("method-override");

mongoose.connect("mongodb://localhost/dr_mydhili");
var app=express();
app.use(bodyparser.urlencoded({extended :true}));
app.use(methodoverride("_method"))

var baseSchema=new mongoose.Schema({
  title:String,
  date:String,
  content:String,
  description:String,
  field:String,
})
var base=mongoose.model("base",baseSchema);

app.get("/",function(req,res){
  base.find({},function(err,base){
    if(err)
    console.log(err);
    else {
      res.render("home.ejs",{base:base});
    }
  })
})
app.get("/new",function(req,res){
  res.render("new.ejs");
})
app.post("/",function(req,res){
  var title=req.body.title;
  var date=req.body.date;
  var content=req.body.content;
  var description=req.body.description;
  var field=req.body.field;
  var image=req.body.image;
  var newbase=({title:title,date:date,content:content,description:description,field:field});
  base.create(newbase,function(err,newbase){
    if(err)
    console.log(err);
    else
      res.redirect("/");
  })
})

app.get("/:id",function(req,res){
  base.findById(req.params.id,function(err,base){
    if(err)
    console.log(err);
    else {
      res.render("show.ejs",{base:base});
    }
  })
})

app.get("/:id/edit",function(req,res){
  base.findById(req.params.id,function(err,base){
    if(err)
    console.log(err);
    else{
      res.render("edit.ejs",{base:base});
    }
  })
})

app.put("/:id",function(req,res){
  var title=req.body.title;
  var date=req.body.date;
  var content=req.body.content;
  var description=req.body.description;
  var field=req.body.field;
  var image=req.body.image;
  var newbase=({title:title,date:date,content:content,description:description,field:field});
  base.findByIdAndUpdate(req.params.id,newbase,function(err,newbase){
    if(err){
      console.log("ERRORSAINYA");
    console.log(err);}
    else
      res.redirect("/"+req.params.id);
  })

app.delete("/:id",function(req,res){
  base.findByIdAndRemove(req.params.id,function(){
    res.redirect("/");
  })
})

})
app.listen(2000,function(){
  console.log("port 2000");
})
