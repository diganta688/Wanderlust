const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const iconSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    iconname:{
        type: String,
        required: true
    },
    iconvalue:{
        type: String,
        required: true
    }
});
let Icon = mongoose.model("Icon", iconSchema);

module.exports = Icon;