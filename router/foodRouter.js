const express = require("express");
const {foodModel} = require("../models/food");
const jwt = require("jsonwebtoken");
const {auth} = require("../middleware/authen")
const foodRouter = express.Router();


foodRouter.get("/", async (req, res) => {
    const fooditem = await foodModel.find();
    res.send({"msg":fooditem})

    
})

foodRouter.get("/veg", async (req, res) => {
    const fooditem = await foodModel.find({"type":"veg"});
    res.send({"msg":fooditem})
})

foodRouter.get("/Non-veg", async (req, res) => {
    const fooditem = await foodModel.find({"type":"non-veg"});
    res.send({"msg":fooditem})
})

foodRouter.post("/create", async (req, res) => {
    const payload = req.body;
    const note = new foodModel(payload);
    await note.save();
    res.send({ "msg": "item Created" });
})

foodRouter.delete("/delete/:id", async (req, res) => {
    const noteID = req.params.id;
    const note = await foodModel.findOne({ "_id": noteID })
    const userId_note = note.userId;
    const userId_req = req.body.userId
    try {
        if (userId_req !== userId_note) {
            res.send({ "msg": "You are not Authorized" });
        } else {
            await foodModel.findByIdAndDelete({ _id: noteID });
            res.send({ "msg": `fooditem with id ${noteID} has been Deleted` });
        }

    } catch (error) {

        res.send({ "msg": "unable to delete note", "error": error.message });
    }
})


foodRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const noteID = req.params.id;
    const note = await foodModel.findOne({ "_id": noteID })
    const userId_note = note.userId;
    const userId_req = req.body.userId
    try {
        if (userId_req !== userId_note) {
            res.send({ "msg": "You are not Authorized" });
        } else {
            await NoteModel.findByIdAndUpdate({ _id: noteID }, payload);
            res.send({ "msg": `fooditem with id ${noteID} has been updated` });
        }

    } catch (error) {

        res.send({ "msg": "unable to update note", "error": error.message });
    }

})


module.exports = { foodRouter }