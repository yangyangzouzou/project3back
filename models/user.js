const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    age: Number,
    profession: {
        type: String,
      },
    brand: {
        type: String,
      },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user" // boolean ? 
    }
  }
 
);

userSchema.index({ username: 1 }, { unique: true }); 
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;