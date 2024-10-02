const express = require("express");
const router = express.Router();
const wrapasync = require("../extra/wrapasync.js");
const model = require("../models/hotels.js");

const {isLoggeddIn, isowner, hotelvalidate} = require("../middleware.js");






//!index route
router.get("/",  wrapasync(async (req, res)=>{
    let allhotels = await model.find({});
    res.render("hotels/index.ejs", {allhotels});
}));

//!create route
router.get("/new", isLoggeddIn, (req, res)=>{
    res.render("hotels/new.ejs");
});

//!add hotel route
router.post("/", isLoggeddIn, hotelvalidate, wrapasync(async (req, res, next)=>{
    let newhotel = new model (req.body.hotel);
    newhotel.owner = req.user;
    await newhotel.save();
    req.flash("success", "New Stay added Successfully");
    res.redirect("/hotels");
}));


//!show route
router.get("/:id", wrapasync(async(req, res)=>{
    let {id} = req.params;
    let allinfo = await model.findById(id).populate({path: "reviews", populate:{path:"author"}}).populate("owner");
    if(!allinfo){
        req.flash("error", "Something went wrong");
        res.redirect("/hotels");
    }else{
        // console.log(req.locals.curruser);
        res.render("hotels/show.ejs", {allinfo});
    }
}));


//!edit route
router.get("/:id/edit", isLoggeddIn, isowner, wrapasync(async(req, res)=>{
    let {id}= req.params;
    let detail = await model.findById(id);
    if(!detail){
        req.flash("error", "Something went wrong");
        res.redirect("/hotels");
    }
    else{
        res.render("hotels/edit.ejs", {detail});
    }
}));

//!update route
router.patch("/:id/edit", isLoggeddIn, isowner, hotelvalidate, wrapasync(async(req, res)=>{
    let {id} = req.params;
    await model.findByIdAndUpdate(id, {...req.body.hotel});
    req.flash("success", "Edited successfully");
    res.redirect(`/hotels/${id}`);
}));


//!delete route
router.delete("/:id/delete", isLoggeddIn, isowner, wrapasync(async(req, res)=>{
    let {id} = req.params;
    await model.findByIdAndDelete(id);
    req.flash("success", "Deleted Successful");
    res.redirect("/hotels");
}));


module.exports = router;