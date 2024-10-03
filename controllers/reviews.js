const hotel = require("../models/hotels");
const review = require("../models/review");


module.exports.create = async (req, res)=>{
    let hotelss = await hotel.findById(req.params.id);
    let newreview = new review(req.body.review);
    newreview.author = req.user._id;
    hotelss.reviews.push(newreview);
    await newreview.save();
    await hotelss.save();
    req.flash("success", "New Review added successfully");
    res.redirect(`/hotels/${hotelss.id}`);
    
};

module.exports.delete = async(req, res)=>{
    let {id, reviewId}= req.params;

    await hotel.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted");
    res.redirect(`/hotels/${id}`);
};