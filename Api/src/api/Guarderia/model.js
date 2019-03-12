import mongoose, { Schema } from 'mongoose'

const guarderiaSchema = new Schema({
  name: {
    type: String
  },
  photo: {
    type: String
  },
  address: {
    type: String
  },
  zipcode: {
    type: String
  },
  city: {
    type: String
  },
  province: {
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
      address: this.address,
      zipcode: this.zipcode,
      city: this.city,
      province: this.province,
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
