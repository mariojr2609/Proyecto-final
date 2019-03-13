import mongoose, { Schema } from 'mongoose'

const photoCanguroSchema = new Schema({
  canguro_id: {
    type: String
  },
  imggu[r_link: {
    type: String
  },
  deletehashr_link: {
    type: String
  },
  deletehash: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

photoCanguroSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      canguro_id: this.canguro_id,
      imggu[r_link: this.imggu[r_link,
      deletehashr_link: this.deletehashr_link,
      deletehash: this.deletehash,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('PhotoCanguro', photoCanguroSchema)

export const schema = model.schema
export default model
