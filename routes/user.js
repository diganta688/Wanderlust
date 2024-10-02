const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/user");
const wrapasync = require("../extra/wrapasync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");


router.get("/signup", (req, res)=>{
    res.render("user/signup.ejs");
});

router.post("/signup", wrapasync(async(req, res)=>{
    try{
        let{username, email, password} = req.body;
        const newuser = new User({email, username});    
        await User.register(newuser, password);
        req.login(newuser, (err)=>{
            if(err){
                return next(err);
            };
            req.flash("success", "welcome Back")
            res.redirect("/hotels");

        })
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

router.get("/login",(req, res)=>{
    res.render("user/login.ejs");
});

router.post("/login", saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}),async(req, res)=>{
    req.flash("success", "welcome Back");
    let redirecturl = res.locals.redirectUrl || "/hotels";
    res.redirect(redirecturl);
});

router.get("/logout", (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "logout successful");
        res.redirect("/hotels");
    });
});

module.exports = router;