const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

imageSchema.statics.storeImage = async function (image, user) {
  const newImage = await this.create({ image, user });

  return newImage;
};

const ImageModel = mongoose.model("UserImage", imageSchema);

module.exports = ImageModel;
