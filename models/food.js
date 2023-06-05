const mongoose = require("mongoose");


const foodSchema = mongoose.Schema({
    title:String,
    image:String,
    type:String,
    price:Number
})

const foodModel = mongoose.model("item",foodSchema);

module.exports = {
    foodModel
}