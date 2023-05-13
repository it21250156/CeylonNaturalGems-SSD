const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
    reply:{
        type: String,
        required: true,
    },
     reqId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'requests',
        required: true,
    },
    
});


const ReplyModel = mongoose.model("replies", ReplySchema);
module.exports = ReplyModel;