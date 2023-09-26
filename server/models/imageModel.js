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

imageSchema.statics.storeImage = async function (image, id) {
  const newImage = await this.create({ image, user: id });

  return newImage;
};

const ImageModel = mongoose.model("Image", imageSchema);

module.exports = ImageModel;
