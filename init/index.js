if(process.env.NODE_ENV!= "production"){
    require("dotenv").config({ path: '../.env' });
}


const mongoose = require('mongoose');   
const model = require("../models/hotels.js");
const iconModel = require("../models/icon.js");
const data = require("./data.js");
const iconData = require("./sampleIcon.js");
const dburl = process.env.DB_TOKEN;

main()
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log(err));


async function main(){
    await mongoose.connect(dburl);
};

let add_DB = async ()=>{
    await model.deleteMany({});
    data.data = data.data.map((obj)=>({...obj, owner: "66f5464f0bddbb0a9aee2d3d"}));
    await model.insertMany(data.data);
    await iconModel.deleteMany({});
    await iconModel.insertMany(iconData.iconData);
    console.log("data saved done");
}

add_DB();
