const mongoose = require('mongoose');   
const model = require("../models/hotels.js");
const data = require("./data.js");

main()
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/travel');
};

let add_DB = async ()=>{
    await model.deleteMany({});
    data.data = data.data.map((obj)=>({...obj, owner: "66f5464f0bddbb0a9aee2d3d"}));
    await model.insertMany(data.data);
    console.log("data saved done");
}

add_DB();
