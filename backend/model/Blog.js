const mongoose = require("mongoose")
const {Schema}=mongoose;

const BlogSchema =new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const collection= new mongoose.model("blog",BlogSchema);
module.exports=collection;