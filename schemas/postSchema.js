const { model, Schema } = require("mongoose");

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minLength: [15, "title must be atleast 15 characters long"],
    maxlength: [100, "title must be under 100 characters long"],
  },
  content: {
    type: String,
    required: [true, "text is required"],
    minLength: [50, "Text must be atleast 50 characters long"],
    maxLength: [200, "Text must be under 200 characters long"],
  },
  image: {
    type: String,
    required: [true, "Image URL is required"],
  },
  publishDate: {
    type: Date,
  },
});

const PostModel = model("Post", PostSchema);

module.exports = PostModel;
