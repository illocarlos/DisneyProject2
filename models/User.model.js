const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,

    },
    birthday: {
      type: Date,

    },
    image: {
      type: String,
      required: true,

    },
    gender: {
      type: String,
      enum: ['male', 'female', 'nonbinary'],
      default: 'nonbinary',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
