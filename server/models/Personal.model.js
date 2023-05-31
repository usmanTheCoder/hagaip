import { Schema, model } from "mongoose"

const personalSchema = new Schema(
  {
    aboutMe: {
      type: String,
      trim: true,
    },
    equipment: {
      type: String,
      trim: true,
    },
    declare: {
      type: String,
      trim: true,
    },
    additionalInfo: {
        type: String,
        trim: true,
    },
    userId: {
      type: String,
      required: true
    }
});

const Personal = model("Personal", personalSchema);

export default Personal;