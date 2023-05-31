import { Schema, model } from "mongoose"

const lekiumSchema = new Schema({
  typeOfForm: {
    type: String,
    trim: true,
  },
  chapterName: {
    type: String,
    trim: true,
  },
  subChapters: [{
    subChapterName: {
      type: String,
      trim: true,
    },
    propertyDescription: {
      type: String,
      trim: true,
    },
    reference: {
      type: String,
      trim: true,
    },
    recommendation: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  }],
  image: {
    type: String,
  },
  userId: {
    type: String
  }
});

const Lekium = model("Lekium", lekiumSchema);

export default Lekium;
