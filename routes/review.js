const express = require("express");
const router = express.Router({mergeParams: true});
const wrapasync = require("../extra/wrapasync.js");
const {reviewvalidate, isLoggeddIn, isauthor} = require("../middleware.js");
const reviewcontrollers = require("../controllers/reviews.js");


//!review route
router.post("/", isLoggeddIn, reviewvalidate, wrapasync(reviewcontrollers.create));

//!review delete route
router.delete("/:reviewId", isLoggeddIn, isauthor, wrapasync(reviewcontrollers.delete));


module.exports = router;