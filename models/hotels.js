const mongoose = require('mongoose');
const Review = require("./review.js");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default:"https://static.toiimg.com/photo/msid-94969503,width-96,height-65.cms",
        set: (v)=> v===""?"https://static.toiimg.com/photo/msid-94969503,width-96,height-65.cms":v
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

hotelSchema.post("findOneAndDelete", async(hotel)=>{
    if(hotel){
        await Review.deleteMany({_id: {$in: hotel.reviews}});
    }
});


let Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;