const mongoose = require("mongoose");


const cartSchema = mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String,required:true},
    type:{type:String,required:true},
    price:{type:Number,required:true},
    userId:{type:String,required:true},
    quantity:{type:Number,required:true}
})

const cartModel = mongoose.model("cart-item",cartSchema);

module.exports = {
    cartModel
}