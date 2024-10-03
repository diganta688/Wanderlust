const hotel = require("../models/hotels")

module.exports.index = async (req, res)=>{
    let allhotels = await hotel.find({});
    res.render("hotels/index.ejs", {allhotels});
}

module.exports.create = (req, res)=>{
    res.render("hotels/new.ejs");
}

module.exports.addstay = async (req, res, next)=>{
    let newhotel = new hotel (req.body.hotel);
    newhotel.owner = req.user;
    await newhotel.save();
    req.flash("success", "New Stay added Successfully");
    res.redirect("/hotels");
};

module.exports.show = async(req, res)=>{
    let {id} = req.params;
    let allinfo = await hotel.findById(id).populate({path: "reviews", populate:{path:"author"}}).populate("owner");
    if(!allinfo){
        req.flash("error", "Something went wrong");
        res.redirect("/hotels");
    }else{
        res.render("hotels/show.ejs", {allinfo});
    }
};

module.exports.edit = async(req, res)=>{
    let {id}= req.params;
    let detail = await hotel.findById(id);
    if(!detail){
        req.flash("error", "Something went wrong");
        res.redirect("/hotels");
    }
    else{
        res.render("hotels/edit.ejs", {detail});
    }
};

module.exports.update = async(req, res)=>{
    let {id} = req.params;
    await hotel.findByIdAndUpdate(id, {...req.body.hotel});
    req.flash("success", "Edited successfully");
    res.redirect(`/hotels/${id}`);
};

module.exports.delete = async(req, res)=>{
    let {id} = req.params;
    await hotel.findByIdAndDelete(id);
    req.flash("success", "Deleted Successful");
    res.redirect("/hotels");
};