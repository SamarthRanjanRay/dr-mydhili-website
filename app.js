require("dotenv").config();
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();


app.set('view engine','ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({   //session to start with these settings
    secret:process.env.SECRET_STRING, //used to encrypt session variables
    resave:false,
    saveUninitialized: false,
    cookie : {
        maxAge: 1000* 60 * 60 *24 * 365
    } //stores cookie for one year
}));

app.use(passport.initialize()); //initializes passport
app.use(passport.session());    //begins session


mongoose.set('useNewUrlParser', true); //remove deprecation warning
mongoose.set('useFindAndModify', false); //remove deprecation warning
mongoose.set('useCreateIndex', true); //remove deprecation warning
mongoose.set("useUnifiedTopology",true); //remove deprecation warning
mongoose.connect("mongodb://localhost:27017/DrMydhiliNair"); //connects to mongodb


const userSchema = new mongoose.Schema({
    username: String,
    password: String
})


userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('userAccount',userSchema);

passport.use(User.createStrategy()); //creates local strategy for login by using passportLocalMongoose plugin


passport.serializeUser(function(user, done) { //sets user id as cookie in browser
    done(null, user.id);
});

passport.deserializeUser(function(id, done) { //gets id from cookie and then user is fetched from database
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


app.get("/",(req,res)=>{
    if(req.isAuthenticated()){
        res.redirect("/admin");
    }else{
        res.render("index");
    }
})

app.get("/login",(req,res)=>{
    if(req.isAuthenticated()){
        res.redirect("/admin");
    }else{
        res.render("login");
    }
})

app.post("/login",(req,res)=>{
    const user = new User({
        username:req.body.username,
        password:req.body.password
    });

    passport.authenticate('local')(req,res,()=>{
        res.redirect("/admin");
    })
})

app.get("/admin",(req,res)=>{
    if(!req.isAuthenticated()){
        res.redirect("/");
    }
})

app.get("/createAdmin",(req,res)=>{
    const newUser = {
        username: "admin"
    }
    const password = "admin"
    User.register(newUser, password , (err,user)=>{
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/");
            });
        }
    })
})

app.listen(3000,()=>{
    console.log("Server running at port 3000");
})
