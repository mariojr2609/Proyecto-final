import mongoose, { Schema } from 'mongoose'

const childSchema = new Schema({
  name: {
    type: String
  },
  fecha_nacimiento: {
    type: String
  },
  user_id: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

childSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      fecha_nacimiento: this.fecha_nacimiento,
      user_id: this.user_id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Child', childSchema)

export const schema = model.schema
export default model
