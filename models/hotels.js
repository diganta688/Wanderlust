const mongoose = require('mongoose');
const Review = require("./review.js");
const Schema = mongoose.Schema;
const categories = ['icon', 'beach', 'amazing_view', 'amazing_pools', 'rooms', 'caves', 'farms', 'beachfront', 'castels', 'cabins', 'tree_house', 'island', 'country_side', 'historical_homes', 'bed_breakfast', 'top_cities', 'tranding', 'doms', 'camping', 'boats'];

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
        filename:{
            type: String,
        },
        url:{
            type: String,
        } ,
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
    geometry:{
        type: {
          type: String, 
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
      section: [{
        type: String, 
        section: [{ type: String, enum: ['icon', 'beach', 'amazing_view', 'amazing_pools', 'rooms', 'caves', 'farms', 'beachfront', 'castels', 'cabins', 'tree_house', 'island', 'country_side', 'historical_homes', 'bed_breakfast', 'top_cities', 'tranding', 'doms', 'camping', 'boats'] }],
        required: true 
   }],
});

hotelSchema.post("findOneAndDelete", async(hotel)=>{
    if(hotel){
        await Review.deleteMany({_id: {$in: hotel.reviews}});
    }
});



let Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;