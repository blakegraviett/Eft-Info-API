// * IMPORTS * //
const aysncwrapper = require("../lib/aysncwrapper")
const Item = require("../models/Item.model")

// * CONTROLLERS * //
// GET ALL ITEMS BY LOGGED IN USER
const getAllItems = aysncwrapper(async (req, res) => {
    const itemsListByUser = await Item.find({author: req.user.id})

    res.status(200).json({
        success: true,
        data: {
            Item: itemsListByUser,
            message: "SUCCESS"
        }
       })
     })

// CREAT ITEMS BY LOGGED IN USER
const addItems = aysncwrapper(async (req, res) => {
    const newItem = await Item.create({
        ...req.body,
        author: req.user.id
    })

    res.status(200).json({
        success: true,
        data: {
            Item: newItem,
            message: "SUCCESS"
        }
       })
     })

// DELETE ITEMS BY LOGGED IN USER
const deleteItemByID = aysncwrapper(async (req, res) => {
    deletedItem = await Item.findOneAndDelete({
        author: req.user.id,
        _id: req.params.id
    })

    res.status(200).json({
        success: true,
        data: {
            Item: deletedItem,
            message: "SUCCESS"
        }
       })
})

// * EXPORTS * //
module.exports = {getAllItems, addItems, deleteItemByID}