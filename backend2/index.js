var express=require("express");
var mongoose=require("mongoose");
var bodyparser=require("body-parser");
var methodoverride=require("method-override");

mongoose.connect("mongodb://localhost/dr_mydhili");
var app=express();
app.use(bodyparser.urlencoded({extended :true}));
app.use(bodyparser.json());
app.use(methodoverride("_method"))
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
  res.setHeader('Access-Control-Allow-Credentials','http://localhost:4200', true);
  res.setHeader('Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Language,Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  next();
  });

var baseSchema=new mongoose.Schema({
  title:String,
  date:String,
  content:String,
  description:String,
  field:String,
  image:[String]
})
var base=mongoose.model("base",baseSchema);

app.post("/all",function(req,res){

  json = [];

  req.body.type.forEach(ele => {
    base.find({content : ele},function(err,base){
      if(err)
      console.log(err);
      else {
        base.forEach(public => {
          json.push(public);
        })
      }
    })
  })
  setTimeout(function() {
    console.log(json);

  res.json(json);
}, 3000);

  
})

app.post("/",function(req,res){
  var title=req.body.title;
  var date=req.body.date;
  var content=req.body.content;
  var description=req.body.description;
  var field=req.body.field;
  var image=req.body.image;
  var newbase=({title:title,date:date,content:content,description:description,field:field,image:image});
  base.create(newbase,function(err,newbase){
    if(err)
    console.log(err);
    else {
      res.json(newbase);
    }
  })
})

app.get("/:id",function(req,res){
  base.findById(req.params.id,function(err,base){
    if(err)
    console.log(err);
    else {
      res.json(base);
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
  var newbase=({title:title,date:date,content:content,description:description,field:field,image:image});
  base.findByIdAndUpdate(req.params.id,newbase,function(err,newbase){
    if(err){
      console.log("ERRORSAINYA");
    console.log(err);}
    else
      res.json(newbase);
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
