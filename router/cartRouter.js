
const express = require("express");
const { cartModel } = require("../models/cart");
const cartRouter = express.Router();
const {auth} = require("../middleware/authen")

cartRouter.get("/:id", async (req, res) => {
    const uid = req.params.id;
    console.log(uid);
    try {
        const data = await cartModel.find({ userId: uid });
        console.log(data)
        res.send({"msg":data})
        
    } catch (error) {
        console.log(error);
        res.send({"msg":error.message})
        
    }
})

cartRouter.post('/create',auth, async (req, res) => {
    try {
        console.log(req.body);
        const cartproduct = new cartModel({...req.body, quantity: 1 });
        await cartproduct.save();
        res.send({"msg":"Product has been added to the Cart"})
        
    } catch (error) {
        console.log(error);
        res.send({"msg":error.message})
        
    }
});

cartRouter.delete('/:id',auth, async (req, res) => {
    try {
        await cartModel.findByIdAndDelete({ _id: req.params.id });
        res.send({"msg":"Product removed from the cart"})
        
    } catch (error) {
        console.log(error);
        res.send({"msg":error.message})
    }
})

cartRouter.patch('/:id',auth, async (req, res) => {
    try {
        await cartModel.findByIdAndUpdate({ _id: req.params.id },req.body);
        res.send({"msg":"Product updated successfully"});
        
    } catch (error) {
        console.log(error);
        res.send({"msg":error.message})
    }
})

module.exports = { cartRouter }
