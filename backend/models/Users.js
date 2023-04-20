const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    // requestID:{
    //     type: Number,
    //     required:false,
    // },
    FirstName:{
        type: String,
        required: true,
    },
    LastName:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
    },
    PhoneNo:{
        type: Number,
        required: true,
    },
    GemType:{
        type: String,
        required: true,
    },
    GemColor:{
        type: String,
        required: true,
    },
    GemShape:{
        type: String,
        required: true,
    },
    Description:{
        type: String,
        required: true,
    },
    Weight:{
        type: Number,
        required: true,
    },
    Quantity:{
        type: Number,
        required: true,
    },
});

const ReplySchema = new mongoose.Schema({


    Reply:{
        type: String,
        required: true,
    },

})

const UserModel = mongoose.model("requests", UserSchema);
module.exports = UserModel;