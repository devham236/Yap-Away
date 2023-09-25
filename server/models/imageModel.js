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

imageSchema.statics.storeImage = async function (image) {
  const newImage = await this.create({ image });

  return newImage;
};

const ImageModel = mongoose.model("Image", imageSchema);

module.exports = ImageModel;
