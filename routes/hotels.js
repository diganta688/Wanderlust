const express = require("express");
const router = express.Router();
const wrapasync = require("../extra/wrapasync.js");
const {isLoggeddIn, isowner, hotelvalidate} = require("../middleware.js");
const hotelcontrolers = require("../controllers/hotel.js")
const multer  = require('multer')
const {storage} =require("../cloudinaryConfig.js");
const upload = multer({storage});


// TODO 
router
.route("/")
//!index route
.get(wrapasync(hotelcontrolers.index))
//!add hotel route
.post(isLoggeddIn, upload.single('hotel[image]'), hotelvalidate, wrapasync(hotelcontrolers.addstay));

//!create route
router.get("/new", isLoggeddIn, hotelcontrolers.create);

//!show route
router.get("/:id", wrapasync(hotelcontrolers.show));



// TODO /:id/edit
router
.route("/:id/edit")
//!edit route
.get(isLoggeddIn, isowner, wrapasync(hotelcontrolers.edit))
//!update route
.put(isLoggeddIn, isowner, upload.single('hotel[image]'), hotelvalidate, wrapasync(hotelcontrolers.update));



//!delete route
router.delete("/:id/delete", isLoggeddIn, isowner, wrapasync(hotelcontrolers.delete));


module.exports = router;