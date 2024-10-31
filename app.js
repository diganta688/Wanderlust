if(process.env.NODE_ENV!= "production"){
    require("dotenv").config();
}


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsmate = require('ejs-mate');
const expresserr = require("./extra/expresserror.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");


const hotelRouter = require("./routes/hotels.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const User = require("./models/user.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.engine('ejs', ejsmate);

const DB_URL = process.env.DB_TOKEN;

main()
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect(DB_URL);
};

const store =MongoStore.create({
    mongoUrl:DB_URL,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24*3600
});

store.on("error", ()=>{
    console.log("error in mongo store", err);
});

const sessionOption = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() +7 * 24 * 60 *60 * 1000,
        maxAge: 7* 24* 60* 60* 1000,
        httpOnly: true
    }
}


//!home route
app.get("/", (req, res)=>{
    res.redirect("/hotels");
})

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.success= req.flash("success");
    res.locals.error= req.flash("error");
    res.locals.curruser= req.user;
    next();
});



app.use("/hotels", hotelRouter);
app.use("/hotels/:id/review", reviewRouter);
app.use("/", userRouter);



//! error handeling middlewares
app.all("*", (req, res, next) =>{
    next(new expresserr(404, "page not found"));
});


app.use((err, req, res, next)=>{
    let{status=500, message="Something went wrong"} = err;
    res.status(status).render("err.ejs", {err});
    
});

//*listning
app.listen(3000, (req, res)=>{
    console.log('Server is running on port 3000');    
});




