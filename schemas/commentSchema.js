const { model, Schema } = require("mongoose");

const CommentSchema = new Schema({
  message: {
    type: String,
    required: [true, "Message is required."],
    minLength: [6, "message must be over 6 characters long"],
    maxLength: [100, "message must be under 100 characters long"],
  },
  image: {
    type: String,
  },
  publishDate: {
    type: Date,
  },
  id: {
    type: String,
    required: [true, "id is required"],
  },
});

const CommentModel = model("Comment", CommentSchema);

module.exports = CommentModel;
