import mongoose, { Schema } from 'mongoose'

const guarderiaSchema = new Schema({
  name: {
    type: String
  },
  photo: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  description: {
    type: String
  },
  loc: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

guarderiaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      photo: this.photo,
      phone: this.phone,
      address: this.address,
      city: this.city,
      description: this.description,
      loc: this.loc,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Guarderia', guarderiaSchema)

export const schema = model.schema
export default model
