const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  seotitle: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  }
});

module.exports = Post = mongoose.model("posts", PostSchema);
