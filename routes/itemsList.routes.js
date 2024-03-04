// * IMPORTS * //
const router = require("express").Router()
const {
  getAllItems,
  addItems,
  deleteItemByID,
} = require("../controllers/itemsList.controller")

// * ROUTES *//
// GET WHOLE LIST (per User)
router.get("/", getAllItems)

// ADD SINGLE (per User)
router.post("/", addItems)

// DELTE SINGLE (per User by UID)
router.delete("/:id", deleteItemByID)

// * EXPORTS * //
module.exports = router
