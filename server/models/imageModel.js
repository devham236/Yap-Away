const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  data: {
    Type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

imageSchema.statics.storeImage = async function (image, id) {
  const newImage = await this.create({
    image,
    id,
  });

  return newImage;
};

const ImageModel = mongoose.model("Image", imageSchema);

module.exports = ImageModel;
