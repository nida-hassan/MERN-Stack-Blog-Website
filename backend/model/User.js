const mongoose = require("mongoose")
const {Schema}=mongoose;

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    blogs: [{ 
        type: mongoose.Types.ObjectId, 
        ref: "blog", 
        required: true 
    }]
})

const collection= new mongoose.model("user",UserSchema);
module.exports=collection;