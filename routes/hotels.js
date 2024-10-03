const express = require("express");
const router = express.Router();
const wrapasync = require("../extra/wrapasync.js");
const {isLoggeddIn, isowner, hotelvalidate} = require("../middleware.js");
const hotelcontrolers = require("../controllers/hotel.js")

//!index route
router.get("/",  wrapasync(hotelcontrolers.index));

//!create route
router.get("/new", isLoggeddIn, hotelcontrolers.create);

//!add hotel route
router.post("/", isLoggeddIn, hotelvalidate, wrapasync(hotelcontrolers.addstay));


//!show route
router.get("/:id", wrapasync(hotelcontrolers.show));


//!edit route
router.get("/:id/edit", isLoggeddIn, isowner, wrapasync(hotelcontrolers.edit));

//!update route
router.patch("/:id/edit", isLoggeddIn, isowner, hotelvalidate, wrapasync(hotelcontrolers.update));


//!delete route
router.delete("/:id/delete", isLoggeddIn, isowner, wrapasync(hotelcontrolers.delete));


module.exports = router;