const express = require("express");
const router = express.Router({mergeParams: true});
const wrapasync = require("../extra/wrapasync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const usercontroller = require("../controllers/user.js");


// TODO signup
router
.route("/signup")
.get(usercontroller.getsignup)
.post(wrapasync(usercontroller.postsignup));


// TODO login
router
.route("/login")
.get(usercontroller.getlogin)
.post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}), usercontroller.postlogin);


router.get("/logout", usercontroller.logout);

module.exports = router;