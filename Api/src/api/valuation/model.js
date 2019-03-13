import mongoose, { Schema } from 'mongoose'

const valuationSchema = new Schema({
  name: {
    type: String
  },
  opinion: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

valuationSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      opinion: this.opinion,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Valuation', valuationSchema)

export const schema = model.schema
export default model
