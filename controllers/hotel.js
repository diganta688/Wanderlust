const hotel = require("../models/hotels");
const modelIcon = require("../models/icon");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
    try {
        let allhotels;

        if (req.query && req.query.category) {
            let category = req.query.category;
            allhotels = await hotel.find({});
            allhotels = allhotels.filter(hotel => 
                hotel.section && hotel.section.includes(category) 
            );
        } else {
            allhotels = await hotel.find({});
        }
        let allIcons = await modelIcon.find({});
        res.render("hotels/index.ejs", { allhotels, allIcons, category: req.query.category });
    } catch (error) {
        console.error("Error fetching hotels:", error);
        res.status(500).send("Internal Server Error"); // Handle errors
    }
};


module.exports.create = (req, res)=>{
    res.render("hotels/new.ejs");
}

module.exports.addstay = async (req, res, next)=>{
    let responce = await geocodingClient.forwardGeocode({
        query: req.body.hotel.location,
        limit: 1
      })
    .send();
    let newhotel = new hotel (req.body.hotel);
    let url = req.file.path;
    let filename = req.file.filename;
    newhotel.image.url = url;
    newhotel.image.filename = filename;
    newhotel.owner = req.user;
    newhotel.geometry = responce.body.features[0].geometry;    
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
    let sampleimage= detail.image.url;
    sampleimage = sampleimage.replace("/upload", "/upload/q_auto:low/w_250")
    if(!detail){
        req.flash("error", "Something went wrong");
        res.redirect("/hotels");
    }
    else{
        res.render("hotels/edit.ejs", {detail, sampleimage});
    }
};

module.exports.update = async(req, res)=>{
    let {id} = req.params;
    let responce = await geocodingClient.forwardGeocode({
        query: req.body.hotel.location,
        limit: 1
      })
    .send();
    let updatedHotel = await hotel.findByIdAndUpdate(id, {...req.body.hotel});
    let update = await hotel.findById(id);
    update.geometry = responce.body.features[0].geometry;    
    await update.save();

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        updatedHotel.image.url = url;
        updatedHotel.image.filename = filename;
        await updatedHotel.save();
        
    }
    req.flash("success", "Edited successfully");
    res.redirect(`/hotels/${id}`);
};

module.exports.delete = async(req, res)=>{
    let {id} = req.params;
    await hotel.findByIdAndDelete(id);
    req.flash("success", "Deleted Successful");
    res.redirect("/hotels");
};