const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    image:{
        type: String,
        require: true
    },
    type:{
        type: Number,
        default: 1
    },
    token:{
        type: String,
        default: ""
    },
})

module.exports = mongoose.model("user", userSchema)