const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({


    Reply:{
        type: String,
        required: true,
    },

})

const ReplyModel = mongoose.model("reply", ReplySchema);
module.exports = ReplyModel;