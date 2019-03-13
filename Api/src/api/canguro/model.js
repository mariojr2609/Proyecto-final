import mongoose, { Schema } from 'mongoose'

const canguroSchema = new Schema({
  name: {
    type: String
  },
  photo: {
    type: String
  },
  phone: {
    type: String
  },
  age: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  studies: {
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

canguroSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      photo: this.photo,
      phone: this.phone,
      age: this.age,
      address: this.address,
      city: this.city,
      studies: this.studies,
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

const model = mongoose.model('Canguro', canguroSchema)

export const schema = model.schema
export default model
