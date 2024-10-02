const express = require("express");
const router = express.Router({mergeParams: true});
const wrapasync = require("../extra/wrapasync.js");
const Review = require('../models/review.js');
const model = require("../models/hotels.js");
const {reviewvalidate, isLoggeddIn, isauthor} = require("../middleware.js")


//!review route
router.post("/", isLoggeddIn, reviewvalidate, wrapasync(async (req, res)=>{
    let hotelss = await model.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author = req.user._id;
    hotelss.reviews.push(newreview);
    await newreview.save();
    await hotelss.save();
    req.flash("success", "New Review added successfully");
    res.redirect(`/hotels/${hotelss.id}`);
    
}));

//!review delete route
router.delete("/:reviewId", isLoggeddIn, isauthor, wrapasync(async(req, res)=>{
    let {id, reviewId}= req.params;

    await model.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted");
    res.redirect(`/hotels/${id}`);
}));


module.exports = router;