const express = require("express");
const router = express.Router({mergeParams: true});
const wrapasync = require("../extra/wrapasync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const usercontroller = require("../controllers/user.js");


router.get("/signup", usercontroller.getsignup);

router.post("/signup", wrapasync(usercontroller.postsignup));

router.get("/login", usercontroller.getlogin);

router.post("/login", saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}), usercontroller.postlogin);

router.get("/logout", usercontroller.logout);

module.exports = router;