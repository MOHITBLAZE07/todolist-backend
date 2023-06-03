const mongoose = require("mongoose");

const Todo = new mongoose.Schema({
    task : {
        type:String,
        required : true,
    },
    createdDate : {
        type: Date,
        default: Date.now(),
    },
    editedDate : {
        type: Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("todo",Todo);