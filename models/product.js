const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    productBrand: {
      type: String,
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    serialNumber: {
      type: String,
    },
    manufactureInfo: {
      type: String
    },
    price: Number,
      rating: {
        type: String,
        required: true
      },
      comment: {
        type: String,
      },
    avatar: {
        type: String,
        default:
          "https://vignette.wikia.nocookie.net/ghostintheshell/images/f/fe/Laughing_man.svg/revision/latest/scale-to-width-down/300?cb=20100909044445&path-prefix=en"
      },
    isFrontPage: {
      type:Boolean,
      default: false
    }
  }
 
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;