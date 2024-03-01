// * IMPORTS * //
const {mongoose, Types} = require('mongoose');
const Schema = mongoose.Schema;

// * MODEL * //
const itemModel = new Schema({
    name: {
        type: String,
        required:true
    },
    iconLink: {
        type: String,
        required:true,
        validate: {
            validator: function (value) {
              // Check to see if the url is valid
              return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value);
            },
            message: props => `${props.value} is not a valid URL!`,
          },
    },
    tarkovDevID: {
        type: String,
        required:true,
    },
    // author
    author: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    {
      timestamps: true,
    })


// * EXPORTS * //
module.exports = mongoose.model("Item", itemModel);