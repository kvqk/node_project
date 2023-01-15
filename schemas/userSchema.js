const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required"],
    minLength: [
      6,
      "firstName's character length must be atleast 6 characters long.",
    ],
    maxLength: [50, "firstName must be bellow 50 characters"],
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
    minLength: [
      6,
      "lastName's character length must be atleast 6 characters long",
    ],
    maxLength: [50, "lastName must be bellow 50 characters"],
  },
  gender: {
    type: String,
    enum: {values: ["Male", "Female"], message: "{VALUE} is not supported",
  },
},
  email: {
    type: String,
    required: [true, "email is required"],
    minLength: [6, "email must be atleast 6 characters long"],
  },
  phone: {
    type: String,
    minLength: [11, "phone Number must be 11 digits long"],
    maxLength: [11, "phone number must be 11 digits long"],
  },
  picture: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  registerDate: {
    type: Date,
  },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
