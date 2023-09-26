const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const validator = require("validator");
const genHashedPassword = require("../utils/genHashedPassword");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // image: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (username, email, password, image) {
  if (!username || !email || !password) {
    throw Error("All fields must be filled.");
  }

  const usernameExists = await this.findOne({ username });

  const emailExists = await this.findOne({ username });

  if (usernameExists) {
    throw Error("Username already in use.");
  }

  if (emailExists) {
    throw Error("Email already in use.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid.");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password is not strong enough. Your password should have at least 8 characters, containing uppercase letters, lowercase letters, a number and a special character."
    );
  }

  const hashedPassword = await genHashedPassword(password);

  const newUser = await this.create({
    username,
    email,
    password: hashedPassword,
    image,
  });

  return newUser;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }

  const correctPassword = await bycrypt.compare(password, user.password);

  if (!correctPassword) {
    throw Error("Wrong Password.");
  }

  return user;
};

userSchema.statics.getUsers = async function (input) {
  const users = await this.find({
    username: { $regex: input, $options: "i" },
  });
  if (users.length === 0) {
    throw Error("No users found");
  }
  return users;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
