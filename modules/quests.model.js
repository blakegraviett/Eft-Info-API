// * IMPORTS * //
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// * MODEL * //
const questsModel = new Schema({
    name: {
        type: String,
        require: true
    },
    ytLink: {
        type: String,
        require: true
    }
})

// * EXPORTS * //
    // ! model must be ("CAPITAL SINGLE", MODEL)
module.exports = mongoose.model("Quest", questsModel);