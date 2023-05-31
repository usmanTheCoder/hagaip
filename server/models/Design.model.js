import { Schema, model } from "mongoose"

const designSchema = new Schema({
    topHeading: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    bottomHeading: {
        type: String
    },
    userId: {
        type: String,
        required: true
    }
})

const Design = model('Design',designSchema)
export default Design