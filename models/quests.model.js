// * IMPORTS * //
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// * MODEL * //
const questsModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  ytLink: {
    type: String,
    required: true,
  },
  trader: {
    type: String,
    required: true,
  },
})

// * EXPORTS * //
// ! model must be ("CAPITAL SINGLE", MODEL)
module.exports = mongoose.model("Quest", questsModel)
