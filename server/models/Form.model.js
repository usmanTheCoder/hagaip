import { Schema, model } from "mongoose"

const formSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    mobileNo: {
      type: Number,
      trim: true,
    },
    selectOptions: {
      type: String
    },
    typeOfForm: {
      type: String,
    },
    date: {
      type: Date,
      // default: new Date()
    },
    typeOfTest: {
      type: String,
      trim: true,
    },
    propertyType: {
      type: String,
      trim: true,
    },
    typeOfConstruction: {
      type: String,
      trim: true,
    },
    numberOfRooms: {
      type: Number,
      trim: true,
    },
    propertyDescription: {
      type: String
    },
    typeOfFlooring: {
      type: String,
    },
    exteriorCladding: {
      type: String,
    },
    interiorCoverings: {
      type: String,
    },
    area: {
      type: String,
      trim: true,
    },
    chapterName: {
      type: String,
      trim: true,
    },
    subChapterName: {
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
    image: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        default: 0
    },
    unit: {
        type: String,
        trim: true,
    },
    amount: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    userId: {
      type: String,
      required: true
    }
  },
  { timestamp: true }
);

const Form = model("Form", formSchema);

export default Form;