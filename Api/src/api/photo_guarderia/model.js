import mongoose, { Schema } from 'mongoose'

const photoGuarderiaSchema = new Schema({
  guarderia_id: {
    type: String
  },
  imggur_link: {
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

photoGuarderiaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      guarderia_id: this.guarderia_id,
      imggur_link: this.imggur_link,
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

const model = mongoose.model('PhotoGuarderia', photoGuarderiaSchema)

export const schema = model.schema
export default model
