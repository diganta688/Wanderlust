let model = require("./models/hotels")
const Review = require('./models/review.js');
const expresserr = require("./extra/expresserror.js");
const {joiSchema} = require("./schemaValidation.js");
const {reviewSchema} = require("./schemaValidation.js");

module.exports.isLoggeddIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isowner = async (req, res, next)=>{
    let {id} = req.params;
    let hotel = await model.findById(id);

    if(!hotel.owner.equals(res.locals.curruser._id)){
        req.flash("error", "you are not the owner of the Stay");
        return res.redirect(`/hotels/${id}`);
    }
    next();
};

module.exports.hotelvalidate = (req, res, next)=>{
    const {error} = joiSchema.validate(req.body);
    if(error){
        let errmsg = error.details.map((el)=>el.message).join(",");
        throw new expresserr(400, errmsg);
    }
    else{
        next();
    }
};

module.exports.reviewvalidate = (req, res, next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
        let errmsg = error.details.map((el)=>el.message).join(",");
        throw new expresserr(400, errmsg);
    }
    else{
        next();
    }
};



module.exports.isauthor = async (req, res, next)=>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.curruser._id)){
        req.flash("error", "you are not the author of this review");
        return res.redirect(`/hotels/${id}`);
    }
    next();
};